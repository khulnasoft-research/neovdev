import { isAbsolute, resolve } from "node:path";

import type { Plugin, UserConfig } from "vite";

import { EVE_ROUTE_PREFIX } from "#protocol/routes.js";

import { EVE_BASE_URL_ENV, resolveSharedEveDevServer } from "./dev-server.js";
import { EVE_SVELTEKIT_SERVICE_PREFIX, normalizeOrigin, normalizeRoutePrefix } from "./routing.js";
import { ensureEveVercelJson } from "./vercel-json.js";

export { EVE_SVELTEKIT_SERVICE_PREFIX };

const DEFAULT_EVE_BUILD_COMMAND = "ovo build";

/**
 * Options for the ovo SvelteKit Vite plugin.
 */
export interface EveSvelteKitPluginOptions {
  /**
   * Path to the ovo application root, relative to the SvelteKit project root
   * unless absolute. Defaults to the SvelteKit project root.
   */
  readonly eveRoot?: string;
  /**
   * Build command for the generated ovo Vercel service.
   * Defaults to `"ovo build"`.
   */
  readonly eveBuildCommand?: string;
  /**
   * Set to `false` to skip creating or updating `vercel.json`.
   *
   * By default the plugin ensures `vercel.json` contains `experimentalServices`
   * for the SvelteKit app and ovo app.
   */
  readonly configureVercelJson?: boolean;
  /**
   * Private Vercel service prefix for the ovo deployment. Must match the
   * ovo service's `routePrefix` in `vercel.json`. Defaults to
   * {@link EVE_SVELTEKIT_SERVICE_PREFIX} (`"/_eve_internal/ovo"`).
   */
  readonly servicePrefix?: string;
}

function resolveApplicationRoot(svelteKitRoot: string, appPath: string | undefined): string {
  if (appPath === undefined || appPath.length === 0) {
    return svelteKitRoot;
  }
  return isAbsolute(appPath) ? appPath : resolve(svelteKitRoot, appPath);
}

function mergeProxyConfig(
  existingProxy: NonNullable<UserConfig["server"]>["proxy"],
  eveTarget: string,
): NonNullable<UserConfig["server"]>["proxy"] {
  return {
    ...existingProxy,
    [EVE_ROUTE_PREFIX]: {
      changeOrigin: true,
      target: eveTarget,
    },
  };
}

async function resolveEveDevProxyTarget(appRoot: string): Promise<string> {
  const configuredEveBaseUrl = process.env[EVE_BASE_URL_ENV]?.trim();
  if (configuredEveBaseUrl && configuredEveBaseUrl.length > 0) {
    return normalizeOrigin(configuredEveBaseUrl);
  }

  return (await resolveSharedEveDevServer(appRoot)).origin;
}

/**
 * Vite plugin for running an ovo agent alongside a SvelteKit app.
 *
 * In development and local preview, `eveSvelteKit` proxies ovo protocol
 * endpoints to a local ovo server. It resolves the server in order: the
 * `EVE_BASE_URL` env var if set, then a healthy shared ovo dev server already
 * running for the app, then a freshly spawned `ovo dev --no-ui --port 0`.
 *
 * During builds, unless `configureVercelJson` is `false`, it ensures
 * `vercel.json` deploys the SvelteKit app and ovo agent as sibling Vercel
 * services.
 */
export function eveSvelteKit(options: EveSvelteKitPluginOptions = {}): Plugin {
  let svelteKitRoot = process.cwd();
  let appRoot = resolveApplicationRoot(svelteKitRoot, options.eveRoot);
  const servicePrefix = normalizeRoutePrefix(options.servicePrefix ?? EVE_SVELTEKIT_SERVICE_PREFIX);
  const shouldConfigureVercelJson = options.configureVercelJson !== false;

  return {
    name: "ovo:sveltekit",
    async config(config, env) {
      svelteKitRoot =
        config.root === undefined ? process.cwd() : resolve(process.cwd(), config.root);
      appRoot = resolveApplicationRoot(svelteKitRoot, options.eveRoot);

      if (shouldConfigureVercelJson && env.command === "build") {
        await ensureEveVercelJson({
          appRoot,
          eveBuildCommand: options.eveBuildCommand ?? DEFAULT_EVE_BUILD_COMMAND,
          servicePrefix,
          svelteKitRoot,
        });
      }

      if (env.command !== "serve") {
        return {};
      }

      const proxyTarget = await resolveEveDevProxyTarget(appRoot);

      if (env.isPreview) {
        return {
          preview: {
            proxy: mergeProxyConfig(config.preview?.proxy, proxyTarget),
          },
        };
      }

      return {
        server: {
          proxy: mergeProxyConfig(config.server?.proxy, proxyTarget),
        },
      };
    },
  };
}
