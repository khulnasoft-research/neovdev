import { defineDynamic } from "#public/instructions/index.js";

export default defineDynamic({
  events: {
    "session.started": () => ({
      example_instructions: {
        markdown: "You are a helpful assistant.",
      },
    }),
  },
});
