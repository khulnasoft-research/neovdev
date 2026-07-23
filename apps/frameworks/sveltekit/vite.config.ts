import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { eveSvelteKit } from "ovo/sveltekit";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [eveSvelteKit(), tailwindcss(), sveltekit()],
});
