import type { Event, WorkflowRun } from "#compiled/@workflow/world/index.js";
import type { CryptoKey } from "./encryption.js";
import { type PreparedReplayPayload, type ReplayPayloadPreparer } from "./serialization.js";
type ReplayPayloadField = "result" | "error" | "payload";
/**
 * Invocation-scoped cache for replay payload hydration.
 *
 * A workflow invocation may replay the same event log through several fresh
 * VMs. This cache keeps the VM-independent decrypt/decompress result across
 * those replays. Deserialization still runs against each VM's globals so every
 * replay receives fresh object graphs and correctly revived Workflow objects.
 *
 * Successful prepared plaintext remains resident for the invocation lifetime.
 * Its memory cost is the sum of decrypted and decompressed payload sizes, but
 * it never crosses workflow runs or queue deliveries.
 */
export declare class ReplayPayloadCache {
  private readonly encryptionKey;
  private readonly preparer;
  private readonly preparedPayloads;
  private readonly primitiveStepResults;
  constructor(encryptionKey: CryptoKey | undefined, preparer?: ReplayPayloadPreparer);
  /**
   * Start every missing binary preparation before workflow execution. Failures
   * are intentionally retained: the ordered event consumer must observe the
   * original rejection before that entry becomes retryable.
   */
  prewarm(workflowRun: WorkflowRun, events: Event[]): Promise<void>;
  /** Return the workflow input after shared host-side preparation. */
  prepareWorkflowInput(workflowRun: WorkflowRun): Promise<PreparedReplayPayload>;
  /**
   * Return an event payload after shared host-side preparation. A rejected
   * preparation is evicted only after this ordered consumer requests it, so a
   * later replay can retry without hiding the original failure.
   */
  prepareEventPayload(
    eventId: string,
    field: ReplayPayloadField,
    value: unknown,
  ): Promise<PreparedReplayPayload>;
  /**
   * Reuse final step values only when sharing them across VMs is unobservable.
   * Objects and large strings/bigints always run `hydrate` again, producing a
   * fresh VM-specific value from the separately cached prepared payload.
   */
  getStepResult(eventId: string, hydrate: () => Promise<unknown>): Promise<unknown>;
  /**
   * Consumer-facing lookup. Binary payloads share preparation; legacy values
   * bypass the cache because their flattened representation may be mutated.
   */
  private consumePreparation;
  /** Start preparation once and share the exact in-flight promise. */
  private ensurePreparation;
  /** Normalize synchronous and asynchronous preparers to one promise contract. */
  private runPreparation;
  private workflowInputKey;
  private eventPayloadKey;
}
export {};
//# sourceMappingURL=replay-payload-cache.d.ts.map
