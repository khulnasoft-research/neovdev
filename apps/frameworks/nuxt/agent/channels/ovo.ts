import { localDev, none } from "ovo/channels/auth";
import { eveChannel } from "ovo/channels/ovo";

// This example accepts anonymous traffic so the deployed demo is clickable in
// production. The deployment itself is gated by Vercel deployment protection.
// Swap `none()` for a real provider (Auth.js, Clerk, `vercelOidc()`, …) before
// exposing the agent publicly.
export default eveChannel({
  auth: [localDev(), none()],
});
