import { mkdir, mkdtemp, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("#shared/resolve-ovo-binary.js", async () => {
  const { join } = await import("node:path");
  return {
    // Pin resolution to the conventional app-local path so build-command
    // assertions stay deterministic without a real ovo install on disk. The
    // real resolver is exercised in resolve-ovo-binary.integration.test.ts.
    resolveEveBinaryPath: (appRoot: string) =>
      join(appRoot, "node_modules", "ovo", "bin", "ovo.js"),
  };
});

import { ensureEveVercelServicesConfig } from "./vercel-services.js";

async function createTempNuxtRoot(): Promise<string> {
  return await mkdtemp(join(tmpdir(), "ovo-nuxt-services-"));
}

async function directoryExists(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ensureEveVercelServicesConfig", () => {
  it("generates the ovo service when vercel.json is missing", async () => {
    const nuxtRoot = await createTempNuxtRoot();

    const result = await ensureEveVercelServicesConfig({
      appRoot: nuxtRoot,
      nuxtRoot,
    });

    expect(result).toEqual({
      mode: "generated",
      services: {
        ovo: {
          buildCommand:
            "cd '../../..' && export EVE_INTERNAL_BUILD_OUTPUT_DIRECTORY='.ovo/vercel-services/ovo/.vercel/output' && export EVE_INTERNAL_HOST_BUILD_OUTPUT_DIRECTORY='.vercel/output' && node 'node_modules/ovo/bin/ovo.js' build",
          framework: "ovo",
          routes: [
            {
              src: "^/ovo/v1/(.*)$",
              transforms: [
                {
                  args: "/ovo/v1/$1",
                  op: "set",
                  type: "request.path",
                },
              ],
            },
          ],
          root: ".ovo/vercel-services/ovo",
        },
      },
    });
  });

  it("creates the isolated service build root", async () => {
    const nuxtRoot = await createTempNuxtRoot();

    await ensureEveVercelServicesConfig({ appRoot: nuxtRoot, nuxtRoot });

    expect(await directoryExists(join(nuxtRoot, ".ovo", "vercel-services", "ovo"))).toBe(true);
  });

  it("uses a custom ovo build command verbatim", async () => {
    const nuxtRoot = await createTempNuxtRoot();

    const result = await ensureEveVercelServicesConfig({
      appRoot: nuxtRoot,
      eveBuildCommand: "pnpm build:ovo",
      nuxtRoot,
    });

    expect(result.mode).toBe("generated");
    expect(result.mode === "generated" && result.services.ovo?.buildCommand).toBe(
      "cd '../../..' && export EVE_INTERNAL_BUILD_OUTPUT_DIRECTORY='.ovo/vercel-services/ovo/.vercel/output' && export EVE_INTERNAL_HOST_BUILD_OUTPUT_DIRECTORY='.vercel/output' && pnpm build:ovo",
    );
  });

  it("resolves relative paths for an ovo app in a subdirectory", async () => {
    const nuxtRoot = await createTempNuxtRoot();
    const appRoot = join(nuxtRoot, "agent");
    await mkdir(appRoot, { recursive: true });

    const result = await ensureEveVercelServicesConfig({ appRoot, nuxtRoot });

    expect(result.mode === "generated" && result.services.ovo?.buildCommand).toBe(
      "cd '../../../agent' && export EVE_INTERNAL_BUILD_OUTPUT_DIRECTORY='../.ovo/vercel-services/ovo/.vercel/output' && export EVE_INTERNAL_HOST_BUILD_OUTPUT_DIRECTORY='../.vercel/output' && node '../node_modules/ovo/bin/ovo.js' build",
    );
  });

  it("reads vercel.json from a linked Vercel project root", async () => {
    const projectRoot = await createTempNuxtRoot();
    const nuxtRoot = join(projectRoot, "apps", "web");
    await mkdir(join(projectRoot, ".vercel"), { recursive: true });
    await writeFile(join(projectRoot, ".vercel", "project.json"), "{}\n");
    await mkdir(nuxtRoot, { recursive: true });
    await writeFile(
      join(projectRoot, "vercel.json"),
      `${JSON.stringify({
        services: {
          web: { root: "apps/web", framework: "nuxtjs" },
          ovo: { root: "agent", framework: "ovo" },
        },
      })}\n`,
    );

    const result = await ensureEveVercelServicesConfig({ appRoot: nuxtRoot, nuxtRoot });

    expect(result).toEqual({ mode: "root" });
  });

  it("generates nothing when vercel.json declares services including ovo", async () => {
    const nuxtRoot = await createTempNuxtRoot();
    await writeFile(
      join(nuxtRoot, "vercel.json"),
      `${JSON.stringify({
        services: {
          web: { root: ".", framework: "nuxtjs" },
          agent: { root: "agent", framework: "ovo" },
        },
      })}\n`,
    );

    const result = await ensureEveVercelServicesConfig({ appRoot: nuxtRoot, nuxtRoot });

    expect(result).toEqual({ mode: "root" });
    expect(await directoryExists(join(nuxtRoot, ".ovo", "vercel-services"))).toBe(false);
  });

  it("accepts the named service array form", async () => {
    const nuxtRoot = await createTempNuxtRoot();
    await writeFile(
      join(nuxtRoot, "vercel.json"),
      `${JSON.stringify({
        services: [
          { name: "web", root: ".", framework: "nuxtjs" },
          { name: "ovo", root: "agent", framework: "ovo" },
        ],
      })}\n`,
    );

    await expect(ensureEveVercelServicesConfig({ appRoot: nuxtRoot, nuxtRoot })).resolves.toEqual({
      mode: "root",
    });
  });

  it("throws when vercel.json services omit the ovo service", async () => {
    const nuxtRoot = await createTempNuxtRoot();
    await writeFile(
      join(nuxtRoot, "vercel.json"),
      `${JSON.stringify({ services: { web: { root: ".", framework: "nuxtjs" } } })}\n`,
    );

    await expect(ensureEveVercelServicesConfig({ appRoot: nuxtRoot, nuxtRoot })).rejects.toThrow(
      /already defines services/,
    );
  });

  it("warns and generates when vercel.json only has legacy experimentalServices", async () => {
    const nuxtRoot = await createTempNuxtRoot();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await writeFile(
      join(nuxtRoot, "vercel.json"),
      `${JSON.stringify({
        experimentalServices: {
          web: { entrypoint: ".", framework: "nuxtjs", routePrefix: "/" },
          ovo: { entrypoint: ".", framework: "ovo", routePrefix: "/_eve_internal/ovo" },
        },
      })}\n`,
    );

    const result = await ensureEveVercelServicesConfig({ appRoot: nuxtRoot, nuxtRoot });

    expect(result.mode).toBe("generated");
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("experimentalServices"));
  });

  it("prefers stable services over legacy experimentalServices without warning", async () => {
    const nuxtRoot = await createTempNuxtRoot();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await writeFile(
      join(nuxtRoot, "vercel.json"),
      `${JSON.stringify({
        experimentalServices: { ovo: { entrypoint: ".", framework: "ovo", routePrefix: "/x" } },
        services: { ovo: { root: ".", framework: "ovo" } },
      })}\n`,
    );

    const result = await ensureEveVercelServicesConfig({ appRoot: nuxtRoot, nuxtRoot });

    expect(result).toEqual({ mode: "root" });
    expect(warn).not.toHaveBeenCalled();
  });

  it("rejects a malformed vercel.json", async () => {
    const nuxtRoot = await createTempNuxtRoot();
    await writeFile(join(nuxtRoot, "vercel.json"), `["not", "an", "object"]\n`);

    await expect(ensureEveVercelServicesConfig({ appRoot: nuxtRoot, nuxtRoot })).rejects.toThrow(
      /must contain a JSON object/,
    );
  });
});
