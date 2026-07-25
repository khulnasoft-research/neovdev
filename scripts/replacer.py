#!/usr/bin/env python3
"""
Case-insensitive find and replace CLI tool for files, directories, and code content.
Supports matching patterns like: Oldname, OldName, OLDNAME
"""

import argparse
import os
import re
import sys
from pathlib import Path
from typing import List, Optional, Tuple


SKIP_DIRS = frozenset({'.git', '__pycache__', 'node_modules', '.tox', '.venv', 'venv', '.ruff_cache', 'dist', 'build', '.next', '.turbo', 'target'})


class CaseInsensitiveReplacer:
    def __init__(self, old_pattern: str, new_pattern: str, dry_run: bool = False, whole_word: bool = False):
        self.old_pattern = old_pattern
        self.new_pattern = new_pattern
        self.dry_run = dry_run
        pattern = re.escape(old_pattern)
        if whole_word:
            pattern = r'\b' + pattern + r'\b'
        self._pattern_re = re.compile(pattern, re.IGNORECASE)

    def matches_pattern(self, text: str) -> bool:
        return bool(self._pattern_re.search(text))

    def replace_in_text(self, text: str) -> str:
        def _replacement(match: re.Match) -> str:
            original = match.group(0)
            if original.isupper():
                return self.new_pattern.upper()
            if original.islower():
                return self.new_pattern.lower()
            if original.istitle():
                return self.new_pattern.title()
            if original[0].isupper() and original[1:].islower():
                return self.new_pattern[0].upper() + self.new_pattern[1:].lower()
            return self.new_pattern
        return self._pattern_re.sub(_replacement, text)

    def find_and_replace_in_files(
        self, directory: str, file_extensions: Optional[List[str]] = None
    ) -> Tuple[int, int]:
        files_processed = 0
        replacements_made = 0

        for root, dirs, files in os.walk(directory):
            _skip_unwanted_dirs(dirs, root)

            for file in files:
                file_path = Path(root) / file

                if file_extensions and file_path.suffix not in file_extensions:
                    continue
                if _looks_binary(file_path):
                    continue

                try:
                    content = file_path.read_text(encoding='utf-8')
                except (UnicodeDecodeError, PermissionError, OSError) as e:
                    print(f"Skipping {file_path}: {e}")
                    continue

                if not self.matches_pattern(content):
                    continue

                new_content = self.replace_in_text(content)

                if not self.dry_run:
                    file_path.write_text(new_content, encoding='utf-8')

                files_processed += 1
                replacements_made += len(self._pattern_re.findall(content))

                action = "Would replace in" if self.dry_run else "Replaced in"
                print(f"{action} {file_path}")

        return files_processed, replacements_made

    def rename_files_and_directories(self, directory: str) -> Tuple[int, int]:
        files_renamed = 0
        dirs_renamed = 0

        renames: List[Tuple[Path, Path, bool]] = []

        for root, dirs, files in os.walk(directory, topdown=False):
            _skip_unwanted_dirs(dirs, root)

            for file in files:
                old_path = Path(root) / file
                if self.matches_pattern(file):
                    new_path = old_path.parent / self.replace_in_text(file)
                    if old_path != new_path:
                        renames.append((old_path, new_path, False))

        for root, dirs, files in os.walk(directory, topdown=False):
            _skip_unwanted_dirs(dirs, root)

            for dir_name in dirs:
                old_path = Path(root) / dir_name
                if self.matches_pattern(dir_name):
                    new_path = old_path.parent / self.replace_in_text(dir_name)
                    if old_path != new_path:
                        renames.append((old_path, new_path, True))

        for old_path, new_path, is_dir in renames:
            action = "Would rename" if self.dry_run else "Renamed"
            kind = "directory" if is_dir else "file"
            print(f"{action} {kind}: {old_path} -> {new_path}")

            if not self.dry_run:
                try:
                    old_path.rename(new_path)
                    if is_dir:
                        dirs_renamed += 1
                    else:
                        files_renamed += 1
                except OSError as e:
                    print(f"Failed to rename {old_path}: {e}")
            else:
                if is_dir:
                    dirs_renamed += 1
                else:
                    files_renamed += 1

        return files_renamed, dirs_renamed


def _skip_unwanted_dirs(dirs: List[str], root: str) -> None:
    for i in reversed(range(len(dirs))):
        if dirs[i] in SKIP_DIRS:
            dirs.pop(i)


def _looks_binary(path: Path, sample_size: int = 8192) -> bool:
    try:
        with open(path, 'rb') as f:
            chunk = f.read(sample_size)
        return b'\0' in chunk
    except OSError:
        return True


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Case-insensitive find and replace tool for files, directories, and code content",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python replacer.py --content OldName NewName /path/to/project
  python replacer.py --rename OldName NewName /path/to/project
  python replacer.py --all OldName NewName /path/to/project
  python replacer.py --content OldName NewName /path/to/project --extensions .py .js .html
  python replacer.py --all --dry-run OldName NewName /path/to/project
  python replacer.py --all --whole-word ovo ovo /path/to/project
""",
    )

    parser.add_argument('old_pattern', help='Pattern to search for (case-insensitive)')
    parser.add_argument('new_pattern', help='Replacement pattern')
    parser.add_argument('directory', help='Directory to search in')

    mode = parser.add_argument_group('mode (at least one required)')
    mode.add_argument('--content', action='store_true', help='Replace in file contents')
    mode.add_argument('--rename', action='store_true', help='Rename files and directories')
    mode.add_argument('--all', action='store_true', help='Replace in content AND rename files/directories')

    parser.add_argument('--dry-run', action='store_true', help='Show what would be changed without making changes')
    parser.add_argument('--extensions', nargs='+', help='File extensions to process (e.g., .py .js .html)')
    parser.add_argument('--whole-word', action='store_true', help='Only match whole words (uses \\b word boundaries)')
    parser.add_argument('--no-skip-binaries', action='store_true', help='Do not skip binary files')

    return parser.parse_args()


def main() -> None:
    args = _parse_args()

    if not any([args.content, args.rename, args.all]):
        print("Error: Must specify one of --content, --rename, or --all")
        sys.exit(1)

    target = Path(args.directory)
    if not target.is_dir():
        print(f"Error: Directory '{args.directory}' does not exist")
        sys.exit(1)

    replacer = CaseInsensitiveReplacer(args.old_pattern, args.new_pattern, args.dry_run, args.whole_word)

    print(f"Pattern:     {args.old_pattern}")
    print(f"Replacement: {args.new_pattern}")
    print(f"Directory:   {target.resolve()}")
    print(f"Mode:        {'DRY RUN' if args.dry_run else 'LIVE'}")
    print(f"Whole word:  {'yes' if args.whole_word else 'no'}")
    print("-" * 50)

    total_files_processed = 0
    total_replacements = 0
    total_files_renamed = 0
    total_dirs_renamed = 0

    if args.content or args.all:
        print("--- File contents ---")
        files_processed, replacements = replacer.find_and_replace_in_files(
            str(target), args.extensions
        )
        total_files_processed += files_processed
        total_replacements += replacements
        print(f"Files with changes: {files_processed}, Replacements: {replacements}")
        print()

    if args.rename or args.all:
        print("--- File / directory names ---")
        files_renamed, dirs_renamed = replacer.rename_files_and_directories(str(target))
        total_files_renamed += files_renamed
        total_dirs_renamed += dirs_renamed
        print(f"Files renamed: {files_renamed}, Directories renamed: {dirs_renamed}")
        print()

    print("=" * 50)
    print("SUMMARY")
    print(f"  Files with content changes:  {total_files_processed}")
    print(f"  Total content replacements:  {total_replacements}")
    print(f"  Files renamed:               {total_files_renamed}")
    print(f"  Directories renamed:         {total_dirs_renamed}")

    if args.dry_run:
        print()
        print("This was a DRY RUN. No changes were made.")


if __name__ == "__main__":
    main()
