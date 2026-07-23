---
name: ovo
description: Build durable backend AI agents with the ovo framework. Use when creating, editing, or debugging an ovo project — agent instructions, skills, tools, connections, channels, sandboxes, subagents, schedules, or evals.
---

# ovo

ovo is a filesystem-first framework for durable backend AI agents. An agent is
a directory on disk — instructions, skills, tools, connections, channels,
subagents, and schedules are all files — and ovo compiles and runs it.

## Source of truth

The complete documentation ships inside the `ovo` package. Do not rely on this
skill for guidance — always read the bundled docs, which match the installed
version exactly:

```
node_modules/ovo/docs/
```

Start with `node_modules/ovo/docs/README.md`. It contains the full
index and recommended reading order. Before writing any ovo code, read the
relevant guide there first.

If `ovo` is not installed yet, install it (`npm install ovo`) or scaffold a new
agent with `npx ovo init <agent-name>`, then read the bundled docs.
