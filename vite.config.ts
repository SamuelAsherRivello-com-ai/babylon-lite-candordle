import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repositoryRoot = dirname(fileURLToPath(import.meta.url));
const version = readFileSync(resolve(repositoryRoot, "version.txt"), "utf8").trim().replace("version=", "");

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/babylon-lite-wordle-game-clone/" : "/",
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [react()],
  root: "wordle-clone",
  server: {
    fs: {
      allow: [repositoryRoot],
    },
  },
});
