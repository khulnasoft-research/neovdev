/**
 * Refusal shown by agent-scoped commands (`ovo link`, `ovo deploy`,
 * `ovo channels …`) when the working directory holds no ovo agent.
 */
export const NOT_AN_AGENT_MESSAGE =
  "No ovo agent in this directory. Run `ovo init <name>`, then run this command from inside the new project.";

/** True when stdin and stdout are both TTYs — the default interactivity gate. */
export function hasInteractiveTerminal(): boolean {
  return Boolean(process.stdin.isTTY && process.stdout.isTTY);
}
