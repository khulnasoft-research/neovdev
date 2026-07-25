import { defineEval } from "ovo/evals";

export default defineEval({
  description: "Consumer-authored and mounted-extension tools coexist and both run in one turn.",
  async test(t) {
    await t.send(
      "First call `local_ping`, then call `gizmo__gizmo_search` with query 'ovo'. Report both outputs.",
    );

    t.succeeded();
    t.calledTool("local_ping", { output: { reply: "local-ping" } });
    t.calledTool("gizmo__gizmo_search", {
      output: { query: "ovo", result: "gizmo-result-for:ovo" },
    });
  },
});
