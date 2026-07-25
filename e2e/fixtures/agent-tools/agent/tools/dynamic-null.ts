import { defineDynamic } from "ovo/tools";

export default defineDynamic({
  events: {
    "session.started": async () => {
      return null;
    },
  },
});
