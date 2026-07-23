import { eveChannel } from "ovo/channels/ovo";
import { localDev, placeholderAuth, vercelOidc } from "ovo/channels/auth";

export default eveChannel({
  auth: [
    // Lets the ovo TUI and your Vercel deployments reach the deployed agent.
    vercelOidc(),
    // Open on localhost for `ovo dev` and the REPL; ignored in production.
    localDev(),
    // This placeholder will not allow browser requests in production.
    // Replace it with your app's auth provider, like Auth.js or Clerk,
    // or use none() for a public demo.
    placeholderAuth(),
  ],
});
