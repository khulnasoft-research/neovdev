import { readdirSync } from "node:fs";

import { describe, expect, it } from "vitest";

import {
  HANDOFF_SECTIONS,
  initAgentDevHandoff,
  initAgentInstructions,
  initAgentReplPrompt,
  initExtensionHandoff,
  initExtensionInstructions,
  SETUP_SECTIONS,
} from "./agent-instructions.js";

describe("initAgentInstructions", () => {
  // This is the single home for the launching-agent instruction contract; the
  // init and scenario tiers assert control flow, not this prose.
  it("collects intent one question at a time and scaffolds with a universal command", () => {
    const instructions = initAgentInstructions();

    expect(instructions).toContain("questions one at a time");
    expect(instructions).toContain("What should the agent do?");
    expect(instructions).toContain("ask the user to confirm it");
    expect(instructions).toContain("Web Chat");
    expect(instructions).toContain("--channel-web-nextjs");
    // `npx` runs without a prior install and is package-manager agnostic, so the
    // pre-scaffold guide renders the universal `npx ovo dev` through the shared
    // prompt renderer rather than a launcher-specific command.
    expect(instructions).toContain("npx ovo@latest init <name>");
    expect(instructions).toContain("npx ovo@latest extension init <name>");
    expect(instructions).toContain("full docs are bundled");
    expect(instructions).toContain("node_modules/ovo/docs/");
    expect(instructions).toContain("resolve\nthe installed `ovo` package location");
    expect(instructions).toContain("npx ovo dev --no-ui");
    expect(instructions).not.toContain("npm run dev");
    expect(instructions).not.toContain("starts the dev server");
    // The shared renderer resolves every placeholder, even in the pre-scaffold guide.
    expect(instructions).not.toContain("{{");
  });

  it("routes both channels and connections through Vercel Connect", () => {
    const instructions = initAgentInstructions();

    // Channels: Slack credentials are provisioned by Connect, not hand-managed.
    expect(instructions).toContain("ovo channels add slack");
    // Connections: per-user auth wires through Connect's ovo helper.
    expect(instructions).toContain("agent/connections/");
    expect(instructions).toContain("@vercel/connect/ovo");
    // Both surfaces name the product, so neither path is left to hand-rolled tokens.
    expect(instructions.match(/Vercel Connect/g)?.length ?? 0).toBeGreaterThanOrEqual(2);
  });
});

describe("initAgentDevHandoff", () => {
  it("composes the shared sections and keeps verification headless", () => {
    const handoff = initAgentDevHandoff({
      projectPath: "/tmp/triage-bot",
      devCommand: "npm exec -- ovo dev",
    });

    // The intro names the scaffolded project; the shared sections then reference
    // paths relative to it rather than interpolating the working directory.
    expect(handoff).toContain("The project at `/tmp/triage-bot` is already scaffolded");
    expect(handoff).toContain("full docs are bundled");
    expect(handoff).toContain("node_modules/ovo/docs/");
    expect(handoff).toContain("resolve\nthe installed `ovo` package location");
    expect(handoff).toContain("agent/instructions.md");
    expect(handoff).not.toContain("/tmp/triage-bot/");

    // Shared guidance the leaner handoff used to omit now reaches it.
    expect(handoff).toContain("What should the agent do?");
    expect(handoff).toContain("Vercel Connect");
    expect(handoff).toContain("@vercel/connect/ovo");
    expect(handoff).toContain("defineTool");

    // The REPL-versus-headless distinction survives the merge.
    expect(handoff).toContain("HMR development server");
    expect(handoff).toContain("does not start or control this coding-agent session");
    expect(handoff).toMatch(/controllable\s+background process/);
    expect(handoff).toContain("npm exec -- ovo dev --no-ui");
    expect(handoff).toMatch(/give them the interactive\s+command/);
    expect(handoff).not.toContain("{{");
  });
});

describe("initAgentReplPrompt", () => {
  it("uses the shared guidance without interpolating the project path into the launch argument", () => {
    const prompt = initAgentReplPrompt({ devCommand: "pnpm exec ovo dev" });

    expect(prompt).toContain("The project at `.` is already scaffolded.");
    expect(prompt).toContain("What should the agent do?");
    expect(prompt).toContain("pnpm exec ovo dev --no-ui");
    expect(prompt).not.toContain("{{");
  });
});

describe("initExtensionInstructions", () => {
  it("points coding agents at extension init with a package name", () => {
    const instructions = initExtensionInstructions();

    expect(instructions).toContain("npx ovo@latest extension init <name>");
    expect(instructions).toContain("ovo extension build");
    expect(instructions).toContain("does not start ovo dev");
    expect(instructions).not.toContain("{{");
  });
});

describe("initExtensionHandoff", () => {
  it("describes the scaffold and mount next steps without ovo dev", () => {
    const handoff = initExtensionHandoff({
      packageManager: "pnpm",
      packageName: "my-crm",
      projectPath: "/tmp/my-crm",
    });

    expect(handoff).toContain("extension/extension.ts");
    expect(handoff).toContain("pnpm run build");
    expect(handoff).toContain("ovo extension build");
    expect(handoff).toContain('import ext from "my-crm"');
    expect(handoff).toContain("agent/extensions/my-crm.ts");
    expect(handoff).toContain("/tmp/my-crm");
    expect(handoff).not.toContain("ovo dev");
  });
});

describe("agent-prompt sections", () => {
  // Ties the composed section lists to the files on disk: renaming, removing, or
  // adding a section file fails here unless every prompt that should use it is
  // updated, so the lists cannot silently drift away from `agent-prompt/`.
  it("references exactly the section files present in agent-prompt/", () => {
    const onDisk = readdirSync(new URL("./agent-prompt/", import.meta.url))
      .filter((name) => name.endsWith(".md"))
      .sort();
    const referenced = [...new Set([...SETUP_SECTIONS, ...HANDOFF_SECTIONS])].sort();

    expect(referenced).toEqual(onDisk);
  });
});
