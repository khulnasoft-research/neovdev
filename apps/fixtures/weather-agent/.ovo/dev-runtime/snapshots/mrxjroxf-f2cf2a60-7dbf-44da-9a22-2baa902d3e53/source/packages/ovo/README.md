# ovo

ovo is a filesystem-first framework for durable backend agents on Vercel.

You author an agent as a directory on disk. The directory is the contract — markdown for the parts a human should read like a spec, TypeScript for the parts that benefit from real types and runtime behavior.

The framework is called ovo. The published npm package is `ovo`. The CLI binary is `ovo`.

## Preview Terms and Safeguards

ovo is currently a preview and subject to the Vercel beta terms; the framework, APIs, documentation, and behavior may change before general availability.

As the deployer, it is your responsibility to ensure your agent complies with applicable laws.

You are responsible for configuring approval policies, tool restrictions, connection scopes, route/session authorization, sandbox controls, telemetry exports, and other safeguards appropriate for your use case.

Before using ovo with non-public, sensitive, regulated, or production data, review which default tools, custom tools, MCP tools, shell/file/web tools, connected services, subagents, schedules, and external actions are available to the agent.

Require human approval or other safeguards for sensitive, irreversible, regulated, financial, healthcare, employment, housing, legal, safety-impacting, user-impacting, or external side-effecting actions.

Unless you configure stricter controls, ovo agents may operate with permissive settings, including tool execution without human approval where approval is omitted and sandbox network egress that is not deny-all. Do not rely on model behavior alone to prevent sensitive or irreversible actions.

## What ovo Prioritizes

- Markdown-first authoring for instructions and procedures
- TypeScript where typed runtime behavior matters
- Durable message runs and follow-up turns
- Inspectable compiled artifacts under `.ovo/`
- Per-agent sandbox with optional authored overrides
- A stable HTTP protocol with explicit `continuationToken` and `sessionId` contracts
- A runtime model that keeps channels, harnesses, and workflow execution separate

## Authored Directory

```text
my-agent/
├── package.json
├── tsconfig.json
└── agent/
    ├── agent.ts           # additive runtime config (model, name, build, compaction, …)
    ├── instructions.md    # always-on instructions prompt
    ├── tools/             # typed executable integrations
    ├── skills/            # optional named procedures the model can load on demand
    ├── hooks/             # lifecycle and stream-event subscribers
    ├── channels/          # message ingress and delivery (HTTP, Slack, …)
    ├── connections/       # external MCP server connections
    ├── sandbox/           # the agent's single sandbox (optional override)
    ├── workspace/         # files seeded into the sandbox on each session
    ├── subagents/         # specialist child agents (reuse `defineAgent`)
    ├── schedules/         # recurring jobs
    └── lib/               # shared authored code imported by other files
```

## Authoring Helpers

Every authored directory has a typed helper. Import each from the matching subpath:

| Helper                                                                                                              | Subpath                               | Authored Location                                |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------ |
| `defineAgent(...)`                                                                                                  | `ovo`                                 | `agent.ts`, `subagents/<id>/agent.ts`            |
| `defineInstructions(...)`                                                                                           | `ovo/instructions`                    | `instructions.ts` (or `instructions.md`)         |
| `defineTool(...)`, `defineBashTool(...)`, `defineReadFileTool(...)`, `defineWriteFileTool(...)`, `disableTool(...)` | `ovo/tools`                           | `tools/<name>.ts`                                |
| `defineSkill(...)`, `getSkill(...)`                                                                                 | `ovo/skills`                          | `skills/<name>.ts` (or `skills/<name>.md`)       |
| `defineHook(...)`                                                                                                   | `ovo/hooks`                           | `hooks/<slug>.ts`                                |
| `defineChannel(...)`, `POST`, `GET`                                                                                 | `ovo/channels`                        | `channels/<name>.ts`                             |
| `eveChannel(...)`, `slackChannel(...)`, `vercelOidc(...)`                                                           | `ovo/channels/ovo`, `/slack`, `/auth` | reused from `channels/<name>.ts`                 |
| `defineSandbox(...)`                                                                                                | `ovo/sandbox`                         | `sandbox.ts` (or `sandbox/sandbox.ts`)           |
| `defineSchedule(...)`                                                                                               | `ovo/schedules`                       | `schedules/<name>.ts` (or `schedules/<name>.md`) |
| `defineEval(...)`, `defineEvalConfig(...)`                                                                          | `ovo/evals`                           | `evals/<name>.eval.ts`, `evals/evals.config.ts`  |

Runtime accessors live on the subpath that owns the concern:

- `getSession()` — current session, turn, auth, parent lineage (`ovo/context`)
- `getSandbox()` — live sandbox handle for the current agent (`ovo/sandbox`)
- `getSkill(identifier)` — handle for a named skill visible to the current agent (`ovo/skills`)
- `getContext(key)`, `requireContext(key)`, `hasContext(key)`, `setContext(key)`, `ensureContext(key, factory)` — unified context helpers (`ovo/context`)

The complete API reference, including types and lower-level runtime primitives, is in the [TypeScript API documentation](https://ovo.dev/docs/reference/typescript-api).

## Tiny Example

`agent/instructions.md`

```md
You are a weather-focused assistant. Be concise, accurate, and explicit when you use a tool.
```

`agent/tools/get_weather.ts`

```ts
import { defineTool } from "ovo/tools";
import { z } from "zod";

export default defineTool({
  description: "Get the current weather for a city.",
  inputSchema: z.object({
    city: z.string(),
  }),
  async execute(input) {
    return {
      city: input.city,
      condition: "Sunny",
      temperatureF: 72,
    };
  },
});
```

`agent/agent.ts`

```ts
import { defineAgent } from "ovo";

export default defineAgent({
  model: "openai/gpt-5.4-mini",
});
```

## Quick Start

```bash
npx ovo@latest init my-agent
```

`ovo init` writes a new agent with ovo's default model. Pass `--channel-web-nextjs` to add the
Web Chat application. It installs dependencies, initializes Git, and starts the
development server. Targeting an existing project directory (`ovo init .`) adds
the agent files and missing dependencies instead. It does not create a Vercel
project or deploy the agent.

CLI commands:

- `ovo init <name>` — create a new agent
- `ovo info` — discovery results and compiled artifacts
- `ovo build` — compile `.ovo/` and build the host output
- `ovo start` — serve the built `.output/` app
- `ovo dev` — start the local runtime and REPL
- `ovo extension init <name>` — create a new extension package
- `ovo extension build` — build an extension package

## Deploying

ovo is built to be durable. The runtime is Nitro + Workflows. Read the [deployment guide](https://ovo.dev/docs/guides/deployment) for the deployment path, environment variables, and configuration.

## Read Next

These files ship inside the installed package at `node_modules/ovo/docs/`:

- [Full docs index](https://ovo.dev/docs) — recommended entry point
- [Getting Started](https://ovo.dev/docs/getting-started) — install, scaffold, and run locally
- [Project Layout](https://ovo.dev/docs/reference/project-layout) — every authored directory in depth
- [`agent.ts`](https://ovo.dev/docs/agent-config) — agent config reference
- [TypeScript API](https://ovo.dev/docs/reference/typescript-api) — complete `define*` and runtime helper reference
- [Vercel Deployment](https://ovo.dev/docs/guides/deployment) — deploy to production

By authoring concern: [Tools](https://ovo.dev/docs/tools) · [Channels](https://ovo.dev/docs/channels/overview) · [Hooks](https://ovo.dev/docs/guides/hooks) · [Skills](https://ovo.dev/docs/skills) · [Sandbox](https://ovo.dev/docs/sandbox) · [Connections](https://ovo.dev/docs/connections) · [Subagents](https://ovo.dev/docs/subagents) · [Schedules](https://ovo.dev/docs/schedules) · [Evals](https://ovo.dev/docs/evals/overview)

By runtime concern: [Sessions and Streaming](https://ovo.dev/docs/concepts/sessions-runs-and-streaming) · [Session Context](https://ovo.dev/docs/guides/session-context) · [Context Control](https://ovo.dev/docs/concepts/context-control) · [Auth and Route Protection](https://ovo.dev/docs/guides/auth-and-route-protection) · [CLI, Build, and Debugging](https://ovo.dev/docs/reference/cli) · [Instrumentation](https://ovo.dev/docs/guides/instrumentation)

## Architecture (Internals)

You do not need this section to author an ovo agent — it documents the public HTTP protocol contracts so ovo composes predictably with other systems.

ovo's internal split is:

- the **channel** normalizes inbound transport, applies auth and delivery policy, and owns `continuationToken`
- the **harness** does one unit of AI work and returns `{ session, next }`
- the **runtime** persists state, follows `next`, streams events, and owns workflow primitives (`start()`, `resumeHook()`, `createHook()`, `getWritable()`)

That split is why the public HTTP protocol separates two distinct identifiers:

- `continuationToken` — channel-owned handle the caller uses to start the next user turn
- `sessionId` — runtime-owned handle for streaming and inspection

## Changelog

See [`./CHANGELOG.md`](./CHANGELOG.md) for the release history. The changelog ships inside the published package so agents can read it directly from `node_modules/ovo/CHANGELOG.md` to evaluate upgrades.
