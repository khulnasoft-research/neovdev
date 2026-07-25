# SvelteKit with ovo demo

A SvelteKit app with an embedded ovo agent, integrated through the
`eveSvelteKit()` Vite plugin:

```ts
import { eveSvelteKit } from "ovo/sveltekit";

export default defineConfig({
  plugins: [eveSvelteKit(), sveltekit()],
});
```

The agent lives in `agent/` (instructions, tools, channels). The UI in
`src/lib/` is a small agent console built on ovo's Svelte hooks, with
streaming, reasoning, and tool-call rendering.

## Run locally

```sh
pnpm --filter framework-sveltekit dev
```

## Deploy

`vercel.json` declares two services: the SvelteKit app at `/` and ovo behind
the private `/_eve_internal/ovo` service prefix, with rewrites exposing the
public `/ovo/v1/*` endpoints. See
[the SvelteKit frontend docs](../../../docs/guides/frontend/sveltekit.mdx) for
details.
