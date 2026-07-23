# Nuxt with ovo demo

A Nuxt 4 app with an embedded ovo agent, integrated through the `ovo/nuxt` module:

```ts
export default defineNuxtConfig({
  modules: ["ovo/nuxt"],
});
```

The agent lives in `agent/` (instructions, tools, channels) next to the Nuxt `app/` directory. In local development the module starts the ovo runtime alongside the Nuxt dev server and proxies same-origin ovo endpoints to it.

## Run locally

```sh
pnpm --filter framework-nuxt dev
```

## Deploy

On Vercel builds the module generates the ovo service and its routing in the Build Output config, so no `vercel.json` is required. See [the Nuxt frontend docs](../../../docs/guides/frontend/nuxt.mdx) for details.
