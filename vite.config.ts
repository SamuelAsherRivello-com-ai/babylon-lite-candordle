import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repositoryRoot = dirname(fileURLToPath(import.meta.url));
const version = readFileSync(resolve(repositoryRoot, "version.txt"), "utf8").trim().replace("version=", "");
const versionAssetName = "version.txt";

function versionAsset() {
  return {
    name: "serve-version-asset",
    configureServer(server: { middlewares: { use: (handler: (request: { url?: string }, response: { setHeader: (name: string, value: string) => void; end: (body: string) => void }, next: () => void) => void) => void } }) {
      server.middlewares.use((request, response, next) => {
        if (request.url?.split("?", 1)[0] !== `/${versionAssetName}`) {
          next();
          return;
        }
        response.setHeader("Content-Type", "text/plain; charset=utf-8");
        response.end(`version=${version}\n`);
      });
    },
    generateBundle(this: { emitFile: (asset: { type: "asset"; fileName: string; source: string }) => void }) {
      this.emitFile({ type: "asset", fileName: versionAssetName, source: `version=${version}\n` });
    },
  };
}

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/babylon-lite-wordle-game-clone/" : "/",
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [react(), versionAsset()],
  root: "wordle-clone",
  server: {
    fs: {
      allow: [repositoryRoot],
    },
  },
});
