---
title: "TypeScript API"
description: "The define* helpers, the runtime ctx, and where each one is imported from."
---

This is the public surface of the `ovo` package: the `define*` helpers you author with, the `ctx` they receive at runtime, and the import path for each. The full contract lives in `packages/ovo/src/public/index.ts`; anything not exported there is a framework internal.

Identity comes from the filesystem, not a field you set. A tool at `agent/tools/get_weather.ts` is `get_weather`, and a connection at `agent/connections/linear.ts` is `linear`, so no definition carries a `name` or `id`.

Most files look the same: import a helper, default-export the result.

```ts title="agent/agent.ts"
import { defineAgent } from "ovo";

export default defineAgent({ model: "anthropic/claude-opus-4.8" });
```

```ts title="agent/tools/get_weather.ts"
import { defineTool } from "ovo/tools";
import { z } from "zod";

export default defineTool({
  description: "Get the weather for a city.",
  inputSchema: z.object({ city: z.string() }),
  async execute({ city }, ctx) {
    return { city, condition: "Sunny" };
  },
});
```

## The define\* helpers

| Helper                                                | Import from                                   | Authored at                          | Guide                                                  |
| ----------------------------------------------------- | --------------------------------------------- | ------------------------------------ | ------------------------------------------------------ |
| `defineAgent`                                         | `ovo`                                         | `agent/agent.ts`                     | [agent.ts](../agent-config)                            |
| `defineTool`                                          | `ovo/tools`                                   | `agent/tools/<name>.ts`              | [Tools](../tools)                                      |
| `defineDynamic`                                       | `ovo/tools`, `ovo/skills`, `ovo/instructions` | `agent/{tools,skills,instructions}/` | [Dynamic capabilities](../guides/dynamic-capabilities) |
| `defineMcpClientConnection`                           | `ovo/connections`                             | `agent/connections/<name>.ts`        | [MCP connections](../connections/mcp)                  |
| `defineOpenAPIConnection`                             | `ovo/connections`                             | `agent/connections/<name>.ts`        | [OpenAPI connections](../connections/openapi)          |
| `defineChannel`                                       | `ovo/channels`                                | `agent/channels/<name>.ts`           | [Custom channels](../channels/custom)                  |
| `eveChannel`, `slackChannel`, and the other platforms | `ovo/channels/<platform>`                     | `agent/channels/<platform>.ts`       | [Channels](../channels/overview)                       |
| `defineSkill`                                         | `ovo/skills`                                  | `agent/skills/<name>.ts`             | [Skills](../skills)                                    |
| `defineInstructions`                                  | `ovo/instructions`                            | `agent/instructions.ts`              | [Instructions](../instructions)                        |
| `defineHook`                                          | `ovo/hooks`                                   | `agent/hooks/<slug>.ts`              | [Hooks](../guides/hooks)                               |
| `defineSchedule`                                      | `ovo/schedules`                               | `agent/schedules/<name>.ts`          | [Schedules](../schedules)                              |
| `defineState`                                         | `ovo/context`                                 | tools, hooks, lifecycle              | [Session context](../guides/session-context)           |
| `defineSandbox`                                       | `ovo/sandbox`                                 | `agent/sandbox.ts`                   | [Sandbox](../sandbox)                                  |
| `defineInstrumentation`                               | `ovo/instrumentation`                         | `agent/instrumentation.ts`           | [instrumentation.ts](../guides/instrumentation)        |
| `defineRemoteAgent`                                   | `ovo`                                         | `agent/subagents/<id>/agent.ts`      | [Remote agents](../guides/remote-agents)               |
| `defineEval`                                          | `ovo/evals`                                   | `evals/*.eval.ts`                    | [Evals](../evals/overview)                             |
| `defineEvalConfig`                                    | `ovo/evals`                                   | `evals/evals.config.ts`              | [Evals](../evals/overview)                             |
| `mockModel`                                           | `ovo/evals`                                   | Deterministic fixture agent models   | [Evals](../evals/overview)                             |
| `useEveAgent`                                         | `ovo/react`, `ovo/vue`, `ovo/svelte`          | frontend                             | [Frontend](../guides/frontend/overview)                |

A few non-`define*` helpers round out the set: `disableTool` and `experimental_workflow` from `ovo/tools` (see [Default harness](../concepts/default-harness)), the route verbs `GET`/`POST`/`PUT`/`PATCH`/`DELETE`/`WS` from `ovo/channels`, the approval policies `always`/`once`/`never` from `ovo/tools/approval`, and the channel auth helpers `localDev`/`vercelOidc`/`placeholderAuth` from `ovo/channels/auth`. To wrap a built-in tool, import its default value from `ovo/tools/defaults` (`bash`, `readFile`, `writeFile`, `glob`, `grep`, `webFetch`, `webSearch`, `todo`, `loadSkill`). `AgentReasoningDefinition` is exported from `ovo` for the top-level `defineAgent({ reasoning })` setting. `AgentLimitsDefinition` is exported for `defineAgent({ limits })`. `AgentWorkflowDefinition` and `AgentWorkflowWorldDefinition` are exported from `ovo` for the `defineAgent({ experimental: { workflow } })` config shape. `ExperimentalWorkflowToolInput` is exported from `ovo/tools` for the `experimental_workflow(...)` config shape.

## Runtime context (`ctx`)

`ctx` is passed to your tool `execute`, hook handlers, channel event handlers, and connection auth/header resolvers. It is live only while authored code is running, so reaching for it at module top level throws. See [Session context](../guides/session-context) for the full model.

| Member                      | Use                                                                          |
| --------------------------- | ---------------------------------------------------------------------------- |
| `ctx.session`               | Current session, turn, auth, and optional parent lineage (read-only)         |
| `ctx.getSandbox()`          | Live sandbox handle for the current agent                                    |
| `ctx.getSkill(identifier)`  | Handle for a named skill visible to the current agent                        |
| `ctx.getToken(provider)`    | Resolve a bearer token for an inline auth provider such as `connect("...")`  |
| `ctx.requireAuth(provider)` | Evict and re-authorize an inline provider, commonly after a downstream `401` |

## Imports at a glance

| Import                                                      | Holds                                                                 |
| ----------------------------------------------------------- | --------------------------------------------------------------------- |
| `ovo`                                                       | `defineAgent`, `defineRemoteAgent`, agent config types                |
| `ovo/tools`                                                 | `defineTool`, `defineDynamic`, `disableTool`, `experimental_workflow` |
| `ovo/tools/defaults`                                        | the built-in tools as plain values                                    |
| `ovo/tools/approval`                                        | `always`, `once`, `never`                                             |
| `ovo/connections`                                           | `defineMcpClientConnection`, `defineOpenAPIConnection`                |
| `ovo/channels`                                              | `defineChannel`, route verbs                                          |
| `ovo/channels/ovo`                                          | `eveChannel`                                                          |
| `ovo/channels/auth`                                         | `localDev`, `vercelOidc`, `placeholderAuth`                           |
| `ovo/channels/{slack,discord,teams,telegram,twilio,github}` | platform channel factories                                            |
| `ovo/hooks`                                                 | `defineHook`                                                          |
| `ovo/schedules`                                             | `defineSchedule`                                                      |
| `ovo/skills`                                                | `defineSkill`, `defineDynamic`                                        |
| `ovo/instructions`                                          | `defineInstructions`, `defineDynamic`                                 |
| `ovo/context`                                               | `defineState`, session and state types                                |
| `ovo/sandbox`                                               | `defineSandbox`, backends                                             |
| `ovo/instrumentation`                                       | `defineInstrumentation`, `isChannel`                                  |
| `ovo/models/openai`                                         | `experimental_chatgpt`                                                |
| `ovo/evals`                                                 | `defineEval`, `defineEvalConfig`, `mockModel`, eval types             |
| `ovo/evals/expect`                                          | `includes`, `equals`, `matches`, `similarity`                         |
| `ovo/evals/reporters`                                       | `Braintrust`, `JUnit`, `EvalReporter`                                 |
| `ovo/evals/loaders`                                         | `loadJson`, `loadYaml`                                                |
| `ovo/react`, `ovo/vue`, `ovo/svelte`                        | `useEveAgent`                                                         |
| `ovo/next`, `ovo/nuxt`, `ovo/sveltekit`                     | framework bundler plugins                                             |
| [`ovo/client`](../guides/client/overview)                   | `Client`, `ClientSession`                                             |

Exported types ship from the same entrypoint as the helper they describe (for example `ToolDefinition` and `ToolContext` from `ovo/tools`). For the exhaustive list, read `packages/ovo/src/public/index.ts`.

## ChatGPT subscription models

`experimental_chatgpt()` from `ovo/models/openai` serves an OpenAI model through the local Codex login and bills the ChatGPT subscription. With no argument, it selects `gpt-5.6-sol`:

```ts title="agent/agent.ts"
import { defineAgent } from "ovo";
import { experimental_chatgpt } from "ovo/models/openai";

export default defineAgent({
  model: experimental_chatgpt(),
  modelContextWindowTokens: 200_000,
});
```

Pass another bare OpenAI model slug to override the default. The helper reads credentials from `codex login`, so use it only where that local login exists.

## What to read next

- [`agent.ts`](../agent-config): the agent config these helpers configure
- [Tools](../tools): `defineTool`, the most-used helper
- [Project layout](./project-layout): where each define\* lives on disk
