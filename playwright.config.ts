import { defineConfig } from "@playwright/test";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:6101";

export default defineConfig({
  testDir: "wordle-clone/test/browser",
  use: { baseURL },
  ...(process.env.PLAYWRIGHT_BASE_URL ? {} : {
    webServer: {
      command: "npm run dev -- --host 127.0.0.1 --port 6101",
      url: baseURL,
      reuseExistingServer: false,
    },
  }),
});
