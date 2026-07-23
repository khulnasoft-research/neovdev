# Framework apps

These apps verify ovo's frontend framework integrations and act as runnable examples for maintainers.

- `framework-next` covers `ovo/next` and `withEve()`.
- `framework-next-multi-agent` covers `withEve({ agents })` and named `useEveAgent({ agent })` calls.
- `framework-nuxt` covers the `ovo/nuxt` module.
- `framework-sveltekit` covers the `ovo/sveltekit` Vite plugin.

Keep these apps small and focused on framework wiring. Smoke-test-only behavior belongs in `apps/fixtures`.
