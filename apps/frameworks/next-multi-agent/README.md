# Next.js multi-agent ovo demo

This app demonstrates `withEve({ agents })` with three independent ovo agents
mounted into one Next.js app:

- `support` at `/ovo/agents/support/ovo/v1/*`
- `billing` at `/ovo/agents/billing/ovo/v1/*`
- `research` at `/ovo/agents/research/ovo/v1/*`

Run it locally with:

```sh
pnpm --filter framework-next-multi-agent dev
```

The page calls each agent with `useEveAgent({ agent: "<name>" })`.
