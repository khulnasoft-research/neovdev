import { defineEval } from "ovo/evals";

export default defineEval({
  description:
    "An agent-shaped dist extension with a registry-style store layout loads and its tool runs.",
  async test(t) {
    await t.send("Call `gadget__gadget_echo` with message 'ovo'. Report the output.");

    t.succeeded();
    t.calledTool("gadget__gadget_echo", {
      output: { message: "ovo", reply: "gadget-reply:ovo" },
    });
  },
});
