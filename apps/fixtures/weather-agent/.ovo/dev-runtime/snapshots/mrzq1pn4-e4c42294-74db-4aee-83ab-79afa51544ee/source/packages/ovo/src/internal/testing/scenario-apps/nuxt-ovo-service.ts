import type { ScenarioAppDescriptor } from "#internal/testing/scenario-app.js";

// Not resolved from the installed workspace like the Next.js descriptor's
// dependencies: `nuxt` is only an optional peer of ovo, so no copy is
// installed to resolve a version from.
const NUXT_VERSION = "^4.0.0";
const VUE_VERSION = "^3.5.0";

export interface NuxtEveServiceDescriptorOptions {
  readonly installDependencies?: boolean;
}

/**
 * A Nuxt host with a generated ovo Vercel service.
 */
export function createNuxtEveServiceDescriptor(
  options: NuxtEveServiceDescriptorOptions = {},
): ScenarioAppDescriptor {
  return {
    dependencies: {
      nuxt: NUXT_VERSION,
      vue: VUE_VERSION,
    },
    files: {
      "agent/agent.mjs": `import { defineAgent } from "ovo";

export default defineAgent({ model: "openai/gpt-5.4" });
`,
      "agent/instructions.md": "You are a test agent.\n",
      "app/app.vue": `<template>
  <main>ovo nuxt deployment</main>
</template>
`,
      "nuxt.config.ts": `export default defineNuxtConfig({
  compatibilityDate: "2026-05-27",
  ovo: { eveRoot: "agent" },
  modules: ["ovo/nuxt"],
  telemetry: false,
});
`,
      "pnpm-workspace.yaml": "minimumReleaseAge: 0\n",
    },
    installDependencies: options.installDependencies,
    name: "nuxt-ovo-service",
  };
}
