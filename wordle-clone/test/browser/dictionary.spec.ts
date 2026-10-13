import { expect, test } from "@playwright/test";

const browserWords = ["HAPPY", "BROKE", "ROSES", "BAKED"];

test("common five-letter words are accepted guesses", async ({ page }) => {
  for (const word of browserWords) {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByRole("button", { name: "Start Game", exact: true }).click();
    for (const letter of word) await page.getByRole("button", { name: letter, exact: true }).click();
    await page.getByRole("button", { name: "Enter", exact: true }).click();
    await expect(page.locator(".row").first()).toContainText(word);
  }
});
