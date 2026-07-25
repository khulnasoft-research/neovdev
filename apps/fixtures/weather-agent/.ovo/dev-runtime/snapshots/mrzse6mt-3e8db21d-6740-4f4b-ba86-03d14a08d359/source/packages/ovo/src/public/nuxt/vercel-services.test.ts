import { describe, expect, it } from "vitest";

import {
  createEveServiceRequestPathRoute,
  createEveServiceRoute,
  mergeEveVercelConfig,
  type EnsureEveVercelServicesConfigResult,
} from "./vercel-services.js";

const GENERATED: Extract<EnsureEveVercelServicesConfigResult, { mode: "generated" }> = {
  mode: "generated",
  services: {
    ovo: {
      buildCommand: "ovo build",
      framework: "ovo",
      routes: [createEveServiceRequestPathRoute()],
      root: ".ovo/vercel-services/ovo",
    },
  },
};

describe("createEveServiceRoute", () => {
  it("routes the ovo transport namespace to the ovo service", () => {
    expect(createEveServiceRoute()).toEqual({
      destination: {
        service: "ovo",
        type: "service",
      },
      src: "^/ovo/v1/(.*)$",
    });
  });

  it("targets a custom service name", () => {
    expect(createEveServiceRoute("agent").destination.service).toBe("agent");
  });
});

describe("createEveServiceRequestPathRoute", () => {
  it("pins the request path to the ovo transport namespace", () => {
    expect(createEveServiceRequestPathRoute()).toEqual({
      src: "^/ovo/v1/(.*)$",
      transforms: [
        {
          args: "/ovo/v1/$1",
          op: "set",
          type: "request.path",
        },
      ],
    });
  });
});

describe("mergeEveVercelConfig", () => {
  it("builds a fresh config when nothing exists", () => {
    expect(mergeEveVercelConfig(undefined, GENERATED)).toEqual({
      version: 3,
      routes: [createEveServiceRoute()],
      services: GENERATED.services,
    });
  });

  it("prepends the service route before user routes", () => {
    const userRoute = { src: "^/custom/(.*)$", dest: "/other/$1" };

    expect(mergeEveVercelConfig({ routes: [userRoute] }, GENERATED).routes).toEqual([
      createEveServiceRoute(),
      userRoute,
    ]);
  });

  it("inserts the service route before a user filesystem handle", () => {
    const before = { src: "^/a$", dest: "/b" };
    const after = { src: "^/c$", dest: "/d" };

    expect(
      mergeEveVercelConfig({ routes: [before, { handle: "filesystem" }, after] }, GENERATED).routes,
    ).toEqual([before, createEveServiceRoute(), { handle: "filesystem" }, after]);
  });

  it("preserves a user-configured ovo service and routes to it", () => {
    const merged = mergeEveVercelConfig(
      {
        services: {
          agent: { framework: "ovo", buildCommand: "pnpm build:agent", root: "agent" },
          other: { framework: "hono" },
        },
      },
      GENERATED,
    );

    expect(merged.services).toEqual({
      agent: {
        framework: "ovo",
        buildCommand: "pnpm build:agent",
        root: "agent",
        routes: [createEveServiceRequestPathRoute()],
      },
      other: { framework: "hono" },
    });
    expect(merged.routes).toEqual([createEveServiceRoute("agent")]);
  });

  it("stays idempotent when merged twice", () => {
    const once = mergeEveVercelConfig(undefined, GENERATED);

    expect(mergeEveVercelConfig(once, GENERATED)).toEqual(once);
  });

  it("preserves unknown keys and an explicit version", () => {
    const merged = mergeEveVercelConfig({ version: 2, cleanUrls: true }, GENERATED);

    expect(merged.version).toBe(2);
    expect(merged.cleanUrls).toBe(true);
  });
});
