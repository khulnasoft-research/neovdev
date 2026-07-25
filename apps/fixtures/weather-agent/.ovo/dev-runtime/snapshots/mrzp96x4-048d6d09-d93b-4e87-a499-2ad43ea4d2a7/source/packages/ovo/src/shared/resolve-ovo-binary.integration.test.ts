import { mkdir, mkdtemp, realpath, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { resolveEveBinaryPath } from "./resolve-ovo-binary.js";

// Writes a minimal ovo package at `dir` and returns its realpath'd bin path
// (createRequire canonicalizes symlinks, and macOS routes tmpdir through one).
async function writeEvePackage(dir: string): Promise<string> {
  await mkdir(join(dir, "bin"), { recursive: true });
  await writeFile(join(dir, "package.json"), JSON.stringify({ name: "ovo", version: "0.0.0" }));
  await writeFile(join(dir, "bin", "ovo.js"), "#!/usr/bin/env node\n");
  return join(await realpath(dir), "bin", "ovo.js");
}

describe("resolveEveBinaryPath", () => {
  it("resolves ovo hoisted to the workspace root (npm workspaces)", async () => {
    const workspaceRoot = await mkdtemp(join(tmpdir(), "ovo-resolve-"));
    const expected = await writeEvePackage(join(workspaceRoot, "node_modules", "ovo"));

    // The app has no ovo under its own node_modules; npm hoisted it up.
    const appRoot = join(workspaceRoot, "apps", "web");
    await mkdir(appRoot, { recursive: true });
    await writeFile(join(appRoot, "package.json"), JSON.stringify({ name: "web" }));

    // realpath both sides so Windows short (8.3) paths compare equal.
    expect(await realpath(resolveEveBinaryPath(appRoot))).toBe(expected);
  });

  it("resolves ovo through pnpm's virtual-store symlink", async () => {
    const appRoot = await mkdtemp(join(tmpdir(), "ovo-resolve-"));
    await writeFile(join(appRoot, "package.json"), JSON.stringify({ name: "web" }));

    // pnpm installs the real package under .pnpm and symlinks node_modules/ovo
    // to it; the resolver must follow the link to the store.
    const storeRoot = join(appRoot, "node_modules", ".pnpm", "ovo@0.0.0", "node_modules", "ovo");
    const expected = await writeEvePackage(storeRoot);
    await symlink(storeRoot, join(appRoot, "node_modules", "ovo"), "junction");

    expect(await realpath(resolveEveBinaryPath(appRoot))).toBe(expected);
  });
});
