---
title: "CLI"
description: "Reference for every ovo CLI command: init, info, build, start, dev, logs, link, deploy, eval, channels, and extension."
---

The `ovo` binary (`bin: ovo`) runs from your app root, and every command first loads `.env`/`.env.local` from that root. Running `ovo` with no command runs `ovo dev`.

## Commands

| Command                       | Description                                                                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ovo init [target]`           | Create a new agent, or add an agent to an existing project                                                                                            |
| `ovo info`                    | Print the resolved application, including discovered tools, skills, subagents, schedules, channels, routes, artifact paths, and discovery diagnostics |
| `ovo build`                   | Compile `.ovo/` artifacts and build the host output; prints the output directory                                                                      |
| `ovo start`                   | Serve the built `.output/` app; prints the listening URL                                                                                              |
| `ovo dev`                     | Start the local dev server and open the terminal UI                                                                                                   |
| `ovo dev <url>`               | Connect the UI to an existing server URL (e.g. a remote deployment) instead of booting a local server                                                 |
| `ovo logs [logid]`            | Print an `ovo dev` diagnostic log (the most recent when `logid` is omitted)                                                                           |
| `ovo logs ls`                 | List `ovo dev` diagnostic logs, most recent first                                                                                                     |
| `ovo link`                    | Link the directory to a Vercel project and pull AI Gateway credentials                                                                                |
| `ovo deploy`                  | Deploy the agent to Vercel production (links first if needed)                                                                                         |
| `ovo eval`                    | Run evals against the local app or a remote target                                                                                                    |
| `ovo channels add [kind]`     | Scaffold a channel interactively, or by kind (`slack` \| `web`)                                                                                       |
| `ovo channels list`           | List user-authored channels                                                                                                                           |
| `ovo extension init [target]` | Create a new extension package                                                                                                                        |
| `ovo extension build`         | Build the current package as an extension                                                                                                             |

When `ovo build` fails on discovery errors, it prints the full diagnostics report (severity, message, source path) and the diagnostics artifact path.

## `ovo init`

```bash
ovo init [target] [--channel-web-nextjs]
```

Creates a new agent app or adds an agent to an existing app. Always installs dependencies. New directories also initialize Git.

| Target                                    | What happens                                                                                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ovo init my-agent`                       | New agent project in `my-agent/`                                                                                                                         |
| `ovo init .` (or an existing project dir) | Adds `agent/` plus missing `ovo`, `ai`, and `zod` deps. Needs a `package.json` and no `agent/` files yet                                                 |
| `ovo init` with no target                 | Same as `ovo init .`, except coding agents (Claude Code, Cursor, and similar) get a setup guide instead of scaffolding — they have not chosen a name yet |

After scaffolding, a human terminal usually continues into `ovo dev` (or a coding-agent REPL if one is on `PATH` and you pick it). Coding-agent launches print the next steps instead of opening the TUI, so the session does not get stuck. Fresh projects use the parent workspace's package manager when there is one; otherwise they use the manager that launched `ovo init`.

| Flag                   | Type | Default | Description                                                                                           |
| ---------------------- | ---- | ------- | ----------------------------------------------------------------------------------------------------- |
| `--channel-web-nextjs` | flag | off     | Add the Web Chat app (Next.js). Not for existing projects — run `ovo channels add web` there instead. |

## `ovo extension`

Commands for reusable [extension](/docs/extensions) packages. An extension declares distinct authoring and distribution roots in `package.json#ovo.extension` (for example `"ovo": { "extension": { "source": "./extension", "dist": "./dist/extension" } }`).

### `ovo extension init`

```bash
ovo extension init [target]
```

Creates a new extension package, installs dependencies, and initializes Git. Prints next steps instead of starting `ovo dev`.

| Target                      | What happens                                                  |
| --------------------------- | ------------------------------------------------------------- |
| `ovo extension init my-crm` | New extension package in `my-crm/`                            |
| `ovo extension init .`      | Scaffold in the current empty directory                       |
| No target                   | Same as `.` for humans; coding agents get a short setup guide |

Create-only: cannot target an existing project that already has a `package.json`.

See [Extensions](/docs/extensions) for authoring and mount details.

### `ovo extension build`

```bash
ovo extension build
```

Builds the complete agent-shaped extension tree into its configured dist root, emits declarations and compatibility metadata, and fills the package `exports` map. The original TypeScript source is not required in the published package.

## `ovo info`

```bash
ovo info [--json]
```

| Flag     | Type | Default | Description  |
| -------- | ---- | ------- | ------------ |
| `--json` | flag | off     | Emit as JSON |

Run this first when something behaves unexpectedly. It confirms a file was discovered, lists the active surface, and surfaces discovery diagnostics, all faster than booting the dev server.

## `ovo build`

```bash
ovo build [--profile <path>] [--skip-sandbox-prewarm]
```

Compiles and bundles in an invocation-owned directory under `.ovo/builds/`, then publishes the completed host output and prints its path. Scratch workspaces are removed after success or failure.

| Flag                     | Type   | Default | Description                                                                                   |
| ------------------------ | ------ | ------- | --------------------------------------------------------------------------------------------- |
| `--profile <path>`       | string | off     | Best-effort versioned JSON report with build-phase timings and final output-size measurements |
| `--skip-sandbox-prewarm` | flag   | off     | Skip sandbox template prewarm for a Vercel build; the output might not be deployable          |

Use a profile file to establish a repeatable baseline before changing the build pipeline:

```bash
ovo build --profile .ovo/build-profiles/baseline.json
```

The report is attempted only after a successful build. It records total elapsed time, completed phase timings, and final regular-file totals for file count, raw bytes, and the sum of each file compressed with gzip. For Vercel output it also includes a subtotal for every real `.func` directory, so app and flow bundles can be compared separately. The profile path resolves from the app root and should be outside the published output directory; profile collection does not add a file to the deployment. If collection or writing fails, ovo emits a warning but keeps the completed build successful.

Production builds do not write through the stable compiler, host, Nitro, or Workflow files owned by `ovo dev`, so builds can run while a local dev server is active. A failed build leaves the last successful `.output/` and agent summary untouched. Concurrent completed builds serialize only the final publication window.

Useful stable artifacts written by inspection and development flows under `.ovo/` include:

| Artifact                                       | Description                                          |
| ---------------------------------------------- | ---------------------------------------------------- |
| `.ovo/discovery/agent-discovery-manifest.json` | What ovo found on disk                               |
| `.ovo/discovery/diagnostics.json`              | Authored-shape errors and warnings                   |
| `.ovo/compile/compiled-agent-manifest.json`    | The serialized authored surface ovo loads at runtime |
| `.ovo/compile/compile-metadata.json`           | Build-time metadata and paths                        |
| `.ovo/compile/module-map.mjs`                  | Compiled module entrypoints ovo imports at runtime   |

## `ovo start`

```bash
ovo start [--host <host>] [--port <port>]
```

| Flag            | Type   | Default            | Description            |
| --------------- | ------ | ------------------ | ---------------------- |
| `--host <host>` | string | all interfaces     | Host interface to bind |
| `--port <port>` | number | `$PORT`, then 3000 | Port to listen on      |

Serves the previously built output. Prints the listening URL.

## `ovo dev`

```bash
ovo dev [options]
ovo dev https://your-app.vercel.app
```

Pass a bare URL and the UI connects to that server instead of booting a local one (same as `--url`), which lets you smoke-test a preview or production deployment. The interactive UI turns off in a non-TTY terminal.

| Flag                                | Type   | Default            | Description                                                                               |
| ----------------------------------- | ------ | ------------------ | ----------------------------------------------------------------------------------------- |
| `--host <host>`                     | string | all interfaces     | Host interface to bind                                                                    |
| `--port <port>`                     | number | `$PORT`, then 2000 | Port to listen on                                                                         |
| `-u, --url <url>`                   | string | none               | Connect to an existing server URL instead of starting one                                 |
| `-H, --header <header>`             | string | none               | Request header for a URL target, in `Name: value` form; repeat for multiple headers       |
| `--no-ui`                           | flag   | UI on              | Start the server without an interactive UI                                                |
| `--name <name>`                     | string | app folder name    | Title shown in the terminal UI                                                            |
| `--input <text>`                    | string | none               | Pre-fill the prompt input; bare local `/model` starts onboarding                          |
| `--tools <mode>`                    | enum   | `auto-collapsed`   | Tool-call rendering: `full` \| `collapsed` \| `auto-collapsed` \| `hidden`                |
| `--reasoning <mode>`                | enum   | `full`             | Reasoning rendering: `full` \| `collapsed` \| `auto-collapsed` \| `hidden`                |
| `--subagents <mode>`                | enum   | `auto-collapsed`   | Subagent-section rendering: `full` \| `collapsed` \| `auto-collapsed` \| `hidden`         |
| `--connection-auth <mode>`          | enum   | `full`             | Connection-authorization rendering: `full` \| `collapsed` \| `auto-collapsed` \| `hidden` |
| `--assistant-response-stats <mode>` | enum   | `tokensPerSecond`  | Assistant header statistic: `tokens` \| `tokensPerSecond`                                 |
| `--context-size <tokens>`           | number | none               | Model context window size, shown as a usage percentage                                    |
| `--logs <mode>`                     | enum   | `stderr`           | Server/agent logs to show: `all` \| `stderr` \| `sandbox` \| `none`                       |

A fresh `ovo init` passes `--input /model`. That bare local input starts onboarding: the TUI installs the Vercel CLI if needed, asks you to log in if needed, then opens `/model`. Other input stays editable in the prompt.

For a URL target protected by HTTP Basic auth, put the credentials in the URL. Ovo sends them as a Basic `Authorization` header and strips them from the server URL before connecting:

```bash
ovo dev https://user:pass@your-app.example.com
```

For bearer tokens or custom schemes, pass explicit headers with `-H`.

Local dev records the last ready URL per resolved app root in `.ovo/dev-server-state.v1.json`. A second interactive `ovo dev` reconnects only when that URL is loopback and healthy; each terminal UI creates a fresh client session while sharing the server process. A stale or malformed record is replaced when ovo starts a new server. Passing `--host`, `--port`, or a `PORT` environment value skips reconnection and reports a healthy recorded server instead.

Local dev keeps immutable runtime source snapshots under `.ovo/dev-runtime/snapshots/` so in-flight turns hold a consistent code revision while new turns pick up rebuilds. The terminal REPL keeps its logical session across successful rebuilds, so the next turn continues the conversation on the latest generation; use `/new` to start a fresh session. After a generation is superseded, `ovo dev` retains it for at least 30 minutes and also retains the five most recently superseded generations, regardless of the configured Workflow World. The active generation is never pruned. Old runtime snapshots and local sandbox templates are pruned in the background. For manual cleanup, stop `ovo dev` before deleting `.ovo/dev-runtime/snapshots/` or `.ovo/sandbox-cache/local/templates/`. A turn that remains unfinished beyond the automatic retention window can no longer resume after its generation is pruned.

## `ovo logs`

```bash
ovo logs            # print the most recent diagnostic log
ovo logs ls         # list logs, most recent first
ovo logs <logid>    # print a specific log
ovo logs --dump     # prepend the log's environment dump
ovo logs --events   # interleave session events from the local workflow store
```

Each interactive `ovo dev` process writes a private diagnostic log under `.ovo/logs/` capturing stderr, stdout (including sandbox and rebuild lines), tool failures, workflow errors, and ovo framework log records — regardless of what the transcript shows. The file is JSON Lines — every line is one JSON record with `at` and `source` fields. `ovo logs` reads those files back.

A log id is the file name without `.log` (for example `dev-2026-07-15T12-00-00.000Z-123`). `ovo logs <logid>` also accepts the file name, the `.ovo/logs/...` path printed in the dev transcript, or any unambiguous prefix of the id with or without the `dev-` lead — so `ovo logs 2026-07-15` works when a single log matches. An ambiguous prefix fails and lists the candidates.

`ovo logs` prints nothing but records — no path banner on either stream — so `ovo logs 2>&1 | jq -c .` always parses. Discover ids and file paths with `ovo logs ls`; `ovo logs ls --json` emits a machine-readable array with `id`, `path`, `startedAt`, and `sizeBytes`.

`ovo logs --events` resolves session events (`session.started`, `turn.failed`, message deltas, …) from the local workflow store (`.ovo/.workflow-data`) at query time and interleaves them into the output by timestamp as `source: "event"` records — the log file itself never stores them, so nothing is duplicated at capture time. Selection is by the log's time window (its start through the next log's start), so events from concurrently running `ovo dev` processes may appear.

Each log has a same-named `.dump` sibling holding environment diagnostics and session stats as one JSON document. `ovo logs --dump` (with or without a log id) prepends that document to the JSONL log body; the combined output is a valid JSON value stream (`ovo logs --dump | jq -c .`), one self-contained report to attach to an issue. When a log has no dump, the flag is silently a no-op.

## `ovo link`

```bash
ovo link
```

Links the current directory to a Vercel project. After selecting a team, you can create a project named for the agent or link an existing project. The existing-project picker shows recent projects; type a project name and choose **Search for '<name>'** to search the rest of that team's projects. Vercel links the resolved project, ovo verifies its project ID, and then pulls the project's environment so an AI Gateway credential (`VERCEL_OIDC_TOKEN` or `AI_GATEWAY_API_KEY`) lands in `.env.local`. Running it again re-links: the pickers always run, and the new choice wins. The command is interactive only; in CI, use `vercel link --project <name> --yes --non-interactive` instead. A running `ovo dev` reloads env files automatically, so you don't need to restart after the pull.

## `ovo deploy`

```bash
ovo deploy
```

Deploys the agent to Vercel production (`vercel deploy --prod`), installing dependencies first and pulling environment variables after. An already-linked project deploys with or without a TTY (non-interactive runs pass the non-interactive `vercel` flags). An unlinked directory walks the `ovo link` pickers when a terminal is present, and exits with guidance otherwise.

## `ovo eval`

```bash
ovo eval [evalId...] [--url <url>] [options]
```

Runs all discovered evals when no eval ids are given; ids match exactly or by directory prefix (`ovo eval weather` runs everything under `evals/weather/`). Exits `0` when every eval passed its checks, `1` when any eval failed (a failed check, an execution error, or a `--strict` threshold miss), `2` on configuration errors.

| Flag                    | Type   | Default | Description                                    |
| ----------------------- | ------ | ------- | ---------------------------------------------- |
| `--url <url>`           | string | none    | Remote agent URL (skip local host startup)     |
| `--tag <tag...>`        | string | none    | Run only evals carrying a tag                  |
| `--strict`              | flag   | off     | Below-threshold scores also fail the exit code |
| `--list`                | flag   | off     | Print discovered evals without running them    |
| `--timeout <ms>`        | number | none    | Per-eval timeout in milliseconds               |
| `--max-concurrency <n>` | number | 8       | Max concurrent eval executions                 |
| `--json`                | flag   | off     | Output results as JSON                         |
| `--junit <path>`        | string | none    | Write JUnit XML results to a file              |
| `--skip-report`         | flag   | off     | Skip eval-defined reporters (e.g. Braintrust)  |
| `--verbose`             | flag   | off     | Stream per-eval `t.log` lines to stdout        |

See [Evals](../evals/overview) for authoring evals.

## `ovo channels add`

```bash
ovo channels add [kind] [-f] [-y]
```

Scaffolds a channel into `agent/channels/`. With no `kind` it prompts interactively; pass a `kind` (`slack` \| `web`) to scaffold one directly.

| Flag          | Type | Default | Description                                               |
| ------------- | ---- | ------- | --------------------------------------------------------- |
| `-f, --force` | flag | off     | Overwrite existing channel files                          |
| `-y, --yes`   | flag | off     | Assume yes for confirmations; requires an explicit `kind` |

## `ovo channels list`

```bash
ovo channels list [--json]
```

Lists the user-authored channels in the current project.

| Flag     | Type | Default | Description    |
| -------- | ---- | ------- | -------------- |
| `--json` | flag | off     | Output as JSON |

## Recommended loop

1. Edit files under `agent/`.
2. `ovo info` to confirm discovery or read diagnostics.
3. `ovo dev` while iterating locally.
4. `ovo build` before shipping.
5. `ovo start` to smoke-test the built output locally.

Related: [Project layout](./project-layout) · [instrumentation.ts](../guides/instrumentation).

## What to read next

- [Project layout](./project-layout): what `ovo info` discovers
- [instrumentation.ts](../guides/instrumentation): tracing and the error catalog
- [Deployment](../guides/deployment/overview): `ovo build` and `ovo start` in production
