/**
 * Authoring helpers for ovo extensions — reusable packages mounted into an
 * agent through `agent/extensions/`.
 *
 * @example
 * ```ts
 * import { defineExtension } from "ovo/extension";
 * ```
 */

export {
  defineExtension,
  type ExtensionHandle,
  type MountedExtension,
  type NoConfigExtensionHandle,
} from "#public/definitions/extension.js";
