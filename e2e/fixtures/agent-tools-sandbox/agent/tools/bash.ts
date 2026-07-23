import { defineTool, defineBashTool } from "ovo/tools";
import { never } from "ovo/tools/approval";

/**
 * Bash tool exposed to the model for the sandbox-bootstrap smoke
 * test. `approval: never()` keeps the smoke test single-turn
 * and avoids tripping the HITL machinery already exercised by
 * `tool-approval.ts` / `tool-denial.ts`.
 *
 * Wrapping the framework's `defineBashTool()` in `defineTool({...})`
 * gives the inferred default a named return type so tsc does not
 * trip the TS2883 "inferred type cannot be named" portability
 * check.
 */
export default defineTool({
  ...defineBashTool(),
  approval: never(),
});
