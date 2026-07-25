import type { ScenarioAppDescriptor } from "#internal/testing/scenario-app.js";

export const EVE_ROUTE_PORTABILITY_DESCRIPTOR: ScenarioAppDescriptor = {
  files: {
    "agent/channels/ovo.ts": `import { none } from "ovo/channels/auth";
import { eveChannel } from "ovo/channels/ovo";

export default eveChannel({
  auth: none(),
});
`,
  },
  name: "ovo-route-portability",
};
