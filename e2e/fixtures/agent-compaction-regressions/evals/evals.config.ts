import { defineEvalConfig } from "ovo/evals";

export default defineEvalConfig({
  maxConcurrency: 1,
  timeoutMs: 180_000,
});
