import { defineAgent } from "ovo";
import { mockModel } from "ovo/evals";

export default defineAgent({
  model: mockModel(
    ({ lastUserMessage, userMessageCount }) =>
      `stress-ack:${userMessageCount}:${lastUserMessage ?? ""}`,
  ),
  modelContextWindowTokens: 1_000_000,
});
