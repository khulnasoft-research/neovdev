import type {
  Event,
  HealthCheckPayload,
  ValidQueueName,
  WorkflowRun,
  World,
} from "#compiled/@workflow/world/index.js";
import { type CryptoKey } from "../encryption.js";
/**
 * Validates a workflow name and returns the corresponding queue name.
 * Ensures the workflow name only contains safe characters before
 * interpolating it into the queue name string.
 */
export declare function getWorkflowQueueName(
  workflowName: string,
  namespace?: string,
): ValidQueueName;
/**
 * Result of a health check operation.
 */
export interface HealthCheckResult {
  healthy: boolean;
  /** Error message if health check failed */
  error?: string;
  /** Latency if the health check was successful */
  latencyMs?: number;
  /** Spec version of the responding deployment */
  specVersion?: number;
  /**
   * `@workflow/core` version of the responding deployment, used for
   * capability detection (see `getRunCapabilities`). Omitted when the
   * responding deployment did not provide the field as a string —
   * for example, an older `@workflow/core` that predates this field,
   * or a non-JSON plain-text health response.
   */
  workflowCoreVersion?: string;
}
/**
 * Checks if the given message is a health check payload.
 * If so, returns the parsed payload. Otherwise returns undefined.
 */
export declare function parseHealthCheckPayload(message: unknown): HealthCheckPayload | undefined;
/**
 * Handles a health check message by writing the result to the world's stream.
 * The caller can listen to this stream to get the health check response.
 *
 * @param healthCheck - The parsed health check payload
 * @param endpoint - Which endpoint is responding ('workflow' or 'step')
 */
export declare function handleHealthCheckMessage(
  healthCheck: HealthCheckPayload,
  endpoint: "workflow" | "step",
  worldSpecVersion?: number,
): Promise<void>;
export type HealthCheckEndpoint = "workflow" | "step";
export interface HealthCheckOptions {
  /** Timeout in milliseconds to wait for health check response. Default: 30000 (30s) */
  timeout?: number;
  /** Deployment ID to send the health check to. Falls back to process.env.VERCEL_DEPLOYMENT_ID. */
  deploymentId?: string;
  /**
   * Queue namespace of the target deployment (e.g. `'eve'` for topics like
   * `__eve_wkf_workflow_*`). Falls back to `WORKFLOW_QUEUE_NAMESPACE` in the
   * calling process. Cross-context callers (e.g. the observability
   * dashboard) must pass the target deployment's namespace explicitly —
   * the env fallback resolves in the caller's process, and a message
   * published to a mismatched topic has no consumer, so the check would
   * always time out.
   */
  namespace?: string;
}
export declare function healthCheck(
  world: World,
  endpoint: HealthCheckEndpoint,
  options?: HealthCheckOptions,
): Promise<HealthCheckResult>;
/**
 * Loads workflow run events by iterating through all pages of paginated
 * results. Events are returned in chronological (ascending) order for
 * deterministic workflow replay.
 *
 * @param runId - The workflow run ID.
 * @param afterCursor - If provided, only events after this cursor are
 *   returned (incremental load). If omitted, all events are returned.
 *   The returned cursor can be passed back in on a subsequent call for
 *   incremental loading.
 */
export declare function loadWorkflowRunEvents(
  runId: string,
  afterCursor?: string,
): Promise<{
  events: Event[];
  cursor: string | null;
}>;
/**
 * Maximum number of times a replay-context event creation will reload the
 * event log and retry after the backend rejects it as stale (412). After this
 * many failed reloads the precondition error propagates so the run is
 * re-invoked from the queue with a fresh replay.
 */
export declare const PRECONDITION_MAX_RELOAD_RETRIES = 2;
/**
 * A mutable view of the runtime's in-memory event log. `withPreconditionRetry`
 * appends freshly-loaded events to `events` (in place) and advances `cursor`
 * when it reloads, so the caller's loaded snapshot stays current.
 */
export interface MutableEventLog {
  events: Event[];
  cursor: string | null;
}
/**
 * Whether the optimistic-concurrency guard for event creation is enabled.
 * **On by default** where the runtime executes: replay-context creates send a
 * `stateUpdatedAt` snapshot (and can be rejected with 412 by a supporting
 * backend) unless `WORKFLOW_PRECONDITION_GUARD` is set to `0`. Backends without
 * guard support ignore the snapshot, so enabling by default is
 * backward-compatible.
 */
export declare function isPreconditionGuardEnabled(): boolean;
/**
 * The `stateUpdatedAt` value to send with a replay-context event creation: the
 * ULID time (epoch ms) of the latest event the runtime has loaded. Events are
 * stored in ascending order, so the last one is the newest. Returns `undefined`
 * when there are no events or the latest id is not a decodable ULID.
 *
 * Granularity: snapshots are epoch-milliseconds, and the backend allows an
 * equal-timestamp snapshot (an up-to-date client must not be rejected). Two
 * out-of-band events landing in the same millisecond where only the first was
 * loaded therefore pass the guard undetected — the guard is best-effort by
 * design, and fails open rather than livelocking.
 */
export declare function latestEventStateUpdatedAt(events: Event[]): number | undefined;
/**
 * The `stateUpdatedAt` to attach to a replay-context event creation:
 * the loaded snapshot's ULID time when the precondition guard is enabled,
 * `undefined` (no guard, backend behaves as before) otherwise.
 */
export declare function stateUpdatedAtForCreate(events: Event[]): number | undefined;
/**
 * Runs a replay-context event creation with the optimistic-concurrency guard.
 *
 * `op` receives the current `stateUpdatedAt` (the ULID time of the latest
 * loaded event) to pass to `world.events.create`. If the backend rejects the
 * creation as stale (`PreconditionFailedError` / 412), the event log is
 * reloaded to completion from the last cursor, merged into `log` in place, and
 * `op` is retried with the now-newer snapshot — up to
 * `PRECONDITION_MAX_RELOAD_RETRIES` times. If it still fails, the error is
 * rethrown so the run falls back to a queue re-invocation. Non-precondition
 * errors are rethrown immediately.
 */
export declare function withPreconditionRetry<T>(
  runId: string,
  log: MutableEventLog,
  op: (stateUpdatedAt: number | undefined) => Promise<T>,
): Promise<T>;
/**
 * Wraps a request/response handler and adds a health check "mode"
 * based on the presence of a `__health` query parameter.
 */
export declare function withHealthCheck(
  handler: (req: Request) => Promise<Response>,
  worldSpecVersion?: number,
): (req: Request) => Promise<Response>;
/**
 * Queues a message to the specified queue with tracing.
 */
export declare function queueMessage(
  world: World,
  ...args: Parameters<typeof world.queue>
): Promise<void>;
/**
 * Calculates the queue overhead time in milliseconds for a given message.
 */
export declare function getQueueOverhead(message: { requestedAt?: Date }):
  | {
      [k: string]: number;
    }
  | undefined;
/**
 * Returns a memoized accessor for the per-run AES-256 encryption key.
 *
 * The first call resolves the key via `world.getEncryptionKeyForRun` (which
 * may do HKDF derivation locally on Vercel, or a network fetch from
 * external contexts) and imports it as a `CryptoKey`; subsequent calls
 * await the same cached promise. If the world doesn't support encryption
 * or the run has no key configured, the cached value is `undefined`.
 *
 * Used by step / workflow handlers to defer the (potentially expensive)
 * key fetch until the first code path that actually needs it — typically
 * input hydration on the success path, or error dehydration on a failure
 * path. Both paths can race-call the accessor without triggering duplicate
 * fetches.
 *
 * Errors thrown by `getEncryptionKeyForRun` propagate to every caller
 * (the cached promise rejects). This is intentional: when encryption is
 * configured, we never want to silently fall back to plaintext
 * serialization. A propagated error in an event-emission path leaves the
 * outer try/catch to log and surface the issue; the queue's redelivery
 * semantics will retry the key fetch on the next attempt.
 */
export declare function memoizeEncryptionKey(
  world: World,
  runOrId: WorkflowRun | string,
): () => Promise<CryptoKey | undefined>;
//# sourceMappingURL=helpers.d.ts.map
