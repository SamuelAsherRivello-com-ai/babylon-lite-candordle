import { defineConfig } from "@playwright/test";
export default defineConfig({ testDir: "wordle-clone/test/browser", use: { baseURL: "http://127.0.0.1:6101" }, webServer: { command: "npm run dev -- --host 127.0.0.1 --port 6101", url: "http://127.0.0.1:6101", reuseExistingServer: false } });
