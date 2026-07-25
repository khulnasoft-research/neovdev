import { defineDynamic } from "#public/skills/index.js";

export default defineDynamic({
  events: {
    "session.started": () => ({
      example_skill: {
        description: "Example dynamic skill",
        markdown: "You are a helpful assistant.",
      },
    }),
  },
});
