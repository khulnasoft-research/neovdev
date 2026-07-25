import { mkdir, mkdtemp, readFile, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("#shared/resolve-ovo-binary.js", async () => {
  const { join } = await import("node:path");
  return {
    // Pin resolution to the conventional app-local path so build-command
    // assertions stay deterministic without a real ovo install on disk. The
    // real resolver is exercised in resolve-ovo-binary.integration.test.ts.
    resolveEveBinaryPath: (nextRoot: string) =>
      join(nextRoot, "node_modules", "ovo", "bin", "ovo.js"),
  };
});

import { withEve, type EveNextConfig, type EveNextRewriteSections } from "./index.js";

interface TestConfig extends EveNextConfig {
  readonly basePath?: string;
}

async function createTempAppRoot(): Promise<string> {
  return await mkdtemp(join(tmpdir(), "ovo-next-config-"));
}

async function readJsonFile(path: string): Promise<unknown> {
  return JSON.parse(await readFile(path, "utf8")) as unknown;
}

async function resolveConfig(config: ReturnType<typeof withEve<TestConfig>>): Promise<TestConfig> {
  return await config("phase-test", {
    defaultConfig: {},
  });
}

describe("withEve Vercel config", () => {
  const originalCwd = process.cwd();

  afterEach(() => {
    process.chdir(originalCwd);
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("does not create Build Output config outside Vercel when no Vercel project is detected", async () => {
    const appRoot = await createTempAppRoot();
    process.chdir(appRoot);
    vi.stubEnv("NODE_ENV", "production");

    const config = await resolveConfig(withEve<TestConfig>({}));
    const rewrites = await config.rewrites?.();

    await expect(
      readFile(join(appRoot, ".vercel", "output", "config.json"), "utf8"),
    ).rejects.toThrow();
    expect(getBeforeFiles(rewrites)).toContainEqual({
      destination: "http://127.0.0.1:4274/ovo/v1/:path+",
      source: "/ovo/v1/:path+",
    });
  });

  it("writes Build Output config in Vercel even when no linked project is detected", async () => {
    const appRoot = await createTempAppRoot();
    process.chdir(appRoot);
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_URL", "preview.example.com");

    const config = await resolveConfig(withEve<TestConfig>({}));
    const rewrites = await config.rewrites?.();
    const outputConfig = await readJsonFile(join(appRoot, ".vercel", "output", "config.json"));

    expect(outputConfig).toEqual({
      routes: [
        {
          destination: {
            service: "ovo",
            type: "service",
          },
          src: "^/ovo/v1/(.*)$",
        },
      ],
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
      version: 3,
    });
    expect(rewrites).toBeUndefined();
  });

  it("isolates a colocated generated ovo service from the Next.js Build Output", async () => {
    const appRoot = await createTempAppRoot();
    process.chdir(appRoot);
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_URL", "preview.example.com");

    await resolveConfig(withEve<TestConfig>({}));

    const serviceRoot = join(appRoot, ".ovo", "vercel-services", "ovo");
    const outputConfig = await readJsonFile(join(appRoot, ".vercel", "output", "config.json"));

    expect((await stat(serviceRoot)).isDirectory()).toBe(true);
    expect(outputConfig).toMatchObject({
      services: {
        ovo: {
          buildCommand:
            "cd '../../..' && export EVE_INTERNAL_BUILD_OUTPUT_DIRECTORY='.ovo/vercel-services/ovo/.vercel/output' && export EVE_INTERNAL_HOST_BUILD_OUTPUT_DIRECTORY='.vercel/output' && node 'node_modules/ovo/bin/ovo.js' build",
          root: ".ovo/vercel-services/ovo",
        },
      },
    });
  });

  it("writes Build Output config to the closest existing .vercel directory", async () => {
    const projectRoot = await createTempAppRoot();
    const appRoot = join(projectRoot, "apps", "web");
    await mkdir(join(projectRoot, ".vercel"), { recursive: true });
    await writeFile(join(projectRoot, ".vercel", "project.json"), "{}\n");
    await mkdir(appRoot, { recursive: true });
    process.chdir(appRoot);
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_URL", "preview.example.com");

    await resolveConfig(withEve<TestConfig>({}));

    const outputConfig = await readJsonFile(join(projectRoot, ".vercel", "output", "config.json"));

    expect(outputConfig).toEqual({
      routes: [
        {
          destination: {
            service: "ovo",
            type: "service",
          },
          src: "^/ovo/v1/(.*)$",
        },
      ],
      services: {
        ovo: {
          buildCommand:
            "cd '../../..' && export EVE_INTERNAL_BUILD_OUTPUT_DIRECTORY='.ovo/vercel-services/ovo/.vercel/output' && export EVE_INTERNAL_HOST_BUILD_OUTPUT_DIRECTORY='../../.vercel/output' && node 'node_modules/ovo/bin/ovo.js' build",
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
      version: 3,
    });
    await expect(
      readFile(join(appRoot, ".vercel", "output", "config.json"), "utf8"),
    ).rejects.toThrow();
  });

  it("uses an already configured root ovo service", async () => {
    const appRoot = await createTempAppRoot();
    process.chdir(appRoot);
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_URL", "preview.example.com");
    await writeFile(
      join(appRoot, "vercel.json"),
      `${JSON.stringify(
        {
          $schema: "https://openapi.vercel.sh/vercel.json",
          services: {
            agent: {
              entrypoint: "package.json",
              framework: "ovo",
              root: "agent",
            },
          },
        },
        null,
        2,
      )}\n`,
    );

    const config = await resolveConfig(withEve<TestConfig>({}));
    const rewrites = await config.rewrites?.();

    await expect(
      readFile(join(appRoot, ".vercel", "output", "config.json"), "utf8"),
    ).rejects.toThrow();
    expect(rewrites).toBeUndefined();
  });

  it("preserves an already configured Build Output ovo service and inserts its route", async () => {
    const appRoot = await createTempAppRoot();
    process.chdir(appRoot);
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_URL", "preview.example.com");
    await mkdir(join(appRoot, ".vercel", "output"), { recursive: true });
    await writeFile(join(appRoot, ".vercel", "project.json"), "{}\n");
    await writeFile(
      join(appRoot, ".vercel", "output", "config.json"),
      `${JSON.stringify(
        {
          version: 3,
          routes: [
            { handle: "filesystem" },
            {
              destination: {
                service: "agent",
                type: "service",
              },
              src: "^/ovo/v1/(.*)$",
            },
          ],
          services: {
            agent: {
              entrypoint: "package.json",
              framework: "ovo",
              root: "agent",
            },
          },
        },
        null,
        2,
      )}\n`,
    );

    const config = await resolveConfig(withEve<TestConfig>({}));
    const rewrites = await config.rewrites?.();
    const outputConfig = await readJsonFile(join(appRoot, ".vercel", "output", "config.json"));

    expect(outputConfig).toEqual({
      routes: [
        {
          destination: {
            service: "agent",
            type: "service",
          },
          src: "^/ovo/v1/(.*)$",
        },
        { handle: "filesystem" },
      ],
      services: {
        agent: {
          entrypoint: "package.json",
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
          root: "agent",
        },
      },
      version: 3,
    });
    expect(rewrites).toBeUndefined();
  });

  it("accepts a custom ovo service build command", async () => {
    const appRoot = await createTempAppRoot();
    process.chdir(appRoot);
    await mkdir(join(appRoot, ".vercel"), { recursive: true });
    await writeFile(join(appRoot, ".vercel", "project.json"), "{}\n");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_URL", "preview.example.com");

    await resolveConfig(
      withEve<TestConfig>(
        {},
        {
          eveBuildCommand: "pnpm build:ovo",
        },
      ),
    );
    const outputConfig = await readJsonFile(join(appRoot, ".vercel", "output", "config.json"));

    expect(outputConfig).toMatchObject({
      services: {
        ovo: {
          buildCommand:
            "cd '../../..' && export EVE_INTERNAL_BUILD_OUTPUT_DIRECTORY='.ovo/vercel-services/ovo/.vercel/output' && export EVE_INTERNAL_HOST_BUILD_OUTPUT_DIRECTORY='.vercel/output' && pnpm build:ovo",
        },
      },
    });
  });

  it("writes one Build Output service and route for each named agent", async () => {
    const appRoot = await createTempAppRoot();
    process.chdir(appRoot);
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_URL", "preview.example.com");

    const config = await resolveConfig(
      withEve<TestConfig>(
        {},
        {
          agents: {
            billing: {
              buildCommand: "pnpm build:billing-agent",
              root: "./agents/billing",
              servicePrefix: "/_eve_internal/billing",
            },
            support: "./agents/support",
          },
        },
      ),
    );
    const rewrites = await config.rewrites?.();
    const outputConfig = await readJsonFile(join(appRoot, ".vercel", "output", "config.json"));

    expect(outputConfig).toEqual({
      routes: [
        {
          destination: {
            service: "ovo-billing",
            type: "service",
          },
          src: "^/ovo/agents/billing/ovo/v1/(.*)$",
        },
        {
          destination: {
            service: "ovo-support",
            type: "service",
          },
          src: "^/ovo/agents/support/ovo/v1/(.*)$",
        },
      ],
      services: {
        "ovo-billing": {
          buildCommand:
            "cd '../../../agents/billing' && export EVE_INTERNAL_BUILD_OUTPUT_DIRECTORY='../../.ovo/vercel-services/ovo-billing/.vercel/output' && export EVE_INTERNAL_HOST_BUILD_OUTPUT_DIRECTORY='../../.vercel/output' && pnpm build:billing-agent",
          framework: "ovo",
          routes: [
            {
              src: "^/ovo/agents/billing/ovo/v1/(.*)$",
              transforms: [
                {
                  args: "/ovo/v1/$1",
                  op: "set",
                  type: "request.path",
                },
              ],
            },
          ],
          root: ".ovo/vercel-services/ovo-billing",
          routePrefix: "/ovo/agents/billing",
        },
        "ovo-support": {
          buildCommand:
            "cd '../../../agents/support' && export EVE_INTERNAL_BUILD_OUTPUT_DIRECTORY='../../.ovo/vercel-services/ovo-support/.vercel/output' && export EVE_INTERNAL_HOST_BUILD_OUTPUT_DIRECTORY='../../.vercel/output' && node '../../node_modules/ovo/bin/ovo.js' build",
          framework: "ovo",
          routes: [
            {
              src: "^/ovo/agents/support/ovo/v1/(.*)$",
              transforms: [
                {
                  args: "/ovo/v1/$1",
                  op: "set",
                  type: "request.path",
                },
              ],
            },
          ],
          root: ".ovo/vercel-services/ovo-support",
          routePrefix: "/ovo/agents/support",
        },
      },
      version: 3,
    });
    expect(rewrites).toBeUndefined();
  });

  it("normalizes existing Build Output service arrays before adding named agents", async () => {
    const appRoot = await createTempAppRoot();
    process.chdir(appRoot);
    await mkdir(join(appRoot, ".vercel", "output"), { recursive: true });
    await writeFile(join(appRoot, ".vercel", "project.json"), "{}\n");
    await writeFile(join(appRoot, ".vercel", "output", "builds.json"), "{}\n");
    await writeFile(
      join(appRoot, ".vercel", "output", "config.json"),
      `${JSON.stringify(
        {
          version: 3,
          routes: [
            {
              destination: {
                service: "ovo-billing",
                type: "service",
              },
              src: "^/ovo/agents/billing/ovo/v1/(.*)$",
            },
            { handle: "filesystem" },
          ],
          services: [
            {
              buildCommand: "ovo build:support",
              entrypoint: "package.json",
              framework: "ovo",
              name: "ovo-support",
              root: "agents/support",
              routePrefix: "/ovo/agents/support",
              schema: "experimentalServicesV2",
            },
          ],
        },
        null,
        2,
      )}\n`,
    );
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_URL", "preview.example.com");

    const config = await resolveConfig(
      withEve<TestConfig>(
        {},
        {
          agents: {
            billing: "./agents/billing",
            support: "./agents/support",
          },
        },
      ),
    );
    const rewrites = await config.rewrites?.();
    const outputConfig = await readJsonFile(join(appRoot, ".vercel", "output", "config.json"));

    expect(outputConfig).toEqual({
      routes: [
        {
          destination: {
            service: "ovo-billing",
            type: "service",
          },
          src: "^/ovo/agents/billing/ovo/v1/(.*)$",
        },
        {
          destination: {
            service: "ovo-support",
            type: "service",
          },
          src: "^/ovo/agents/support/ovo/v1/(.*)$",
        },
        { handle: "filesystem" },
      ],
      services: {
        "ovo-billing": {
          buildCommand:
            "cd '../../../agents/billing' && export EVE_INTERNAL_BUILD_OUTPUT_DIRECTORY='../../.ovo/vercel-services/ovo-billing/.vercel/output' && export EVE_INTERNAL_HOST_BUILD_OUTPUT_DIRECTORY='../../.vercel/output' && node '../../node_modules/ovo/bin/ovo.js' build",
          framework: "ovo",
          routes: [
            {
              src: "^/ovo/agents/billing/ovo/v1/(.*)$",
              transforms: [
                {
                  args: "/ovo/v1/$1",
                  op: "set",
                  type: "request.path",
                },
              ],
            },
          ],
          root: ".ovo/vercel-services/ovo-billing",
          routePrefix: "/ovo/agents/billing",
        },
        "ovo-support": {
          buildCommand: "ovo build:support",
          entrypoint: "package.json",
          framework: "ovo",
          routes: [
            {
              src: "^/ovo/agents/support/ovo/v1/(.*)$",
              transforms: [
                {
                  args: "/ovo/v1/$1",
                  op: "set",
                  type: "request.path",
                },
              ],
            },
          ],
          root: "agents/support",
          routePrefix: "/ovo/agents/support",
          schema: "experimentalServicesV2",
        },
      },
      version: 3,
    });
    expect(rewrites).toBeUndefined();
  });

  it("does not start a local ovo build while Next.js is building", async () => {
    const appRoot = await createTempAppRoot();
    process.chdir(appRoot);
    vi.stubEnv("NODE_ENV", "production");
    await mkdir(join(appRoot, ".output", "server"), {
      recursive: true,
    });
    await writeFile(join(appRoot, ".output", "server", "index.mjs"), "process.exit(1);\n");

    const config = await withEve<TestConfig>({})("phase-production-build", {
      defaultConfig: {},
    });
    const rewrites = await config.rewrites?.();

    expect(getBeforeFiles(rewrites)).toContainEqual({
      destination: "http://127.0.0.1:4274/ovo/v1/:path+",
      source: "/ovo/v1/:path+",
    });
  });

  it("reuses an app-local development server registry before spawning", async () => {
    const appRoot = await createTempAppRoot();
    process.chdir(appRoot);
    const resolvedAppRoot = process.cwd();
    vi.stubEnv("NODE_ENV", "development");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(null, { status: 200 })),
    );
    await mkdir(join(resolvedAppRoot, ".ovo"), {
      recursive: true,
    });
    await writeFile(
      join(resolvedAppRoot, ".ovo", "next-dev-server.json"),
      `${JSON.stringify(
        {
          appRoot: resolvedAppRoot,
          origin: "http://127.0.0.1:49152",
          pid: null,
          updatedAt: new Date().toISOString(),
        },
        null,
        2,
      )}\n`,
    );

    const config = await resolveConfig(withEve<TestConfig>({}));
    const rewrites = await config.rewrites?.();

    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:49152/ovo/v1/health", {
      signal: expect.any(AbortSignal),
    });
    expect(getBeforeFiles(rewrites)).toContainEqual({
      destination: "http://127.0.0.1:49152/ovo/v1/:path+",
      source: "/ovo/v1/:path+",
    });
  });
});

function getBeforeFiles(
  rewrites: Awaited<ReturnType<NonNullable<TestConfig["rewrites"]>>> | undefined,
): readonly NonNullable<EveNextRewriteSections["beforeFiles"]>[number][] {
  expect(isRewriteSections(rewrites)).toBe(true);
  if (!isRewriteSections(rewrites)) {
    return [];
  }

  return rewrites.beforeFiles ?? [];
}

function isRewriteSections(
  rewrites: Awaited<ReturnType<NonNullable<TestConfig["rewrites"]>>> | undefined,
): rewrites is EveNextRewriteSections {
  return rewrites !== undefined && !Array.isArray(rewrites);
}
