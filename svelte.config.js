/*
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
/*
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
  },
  preprocess: vitePreprocess(),
};
export default config;
*/

import static_adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: static_adapter({
      fallback: "404.html",
    }),
    // Comment the paths if you want to run in dev mode.
    paths: {
      base: process.argv.includes("dev") ? "" : "/ucl-simulator", // or process.env.BASE_PATH, if using GH Actions
    },
  },
};
export default config;
