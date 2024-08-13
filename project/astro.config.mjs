import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind(), react(), svelte(), db()],
  output: 'server'
});
