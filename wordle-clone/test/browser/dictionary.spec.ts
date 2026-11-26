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

test("My Progress filters category results by mode", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "My Progress", exact: true }).click();
  await expect(page.getByRole("combobox", { name: "Mode" })).toHaveValue("classic");
  await page.getByRole("combobox", { name: "Mode" }).selectOption("speed");
  await expect(page.getByRole("combobox", { name: "Mode" })).toHaveValue("speed");
});

test("the start menu remembers round choices and quitting returns to it", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole("combobox", { name: "Mode" }).selectOption("speed");
  await page.getByRole("combobox", { name: "Category" }).selectOption("nature");
  await page.getByRole("button", { name: "Start Game", exact: true }).click();
  await page.getByRole("button", { name: "Open settings", exact: true }).click();
  await page.getByRole("button", { name: "Quit current round", exact: true }).click();
  await page.getByRole("button", { name: "Quit round", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Candordle start menu" })).toBeVisible();
  await expect.poll(() => page.evaluate(() => {
    const saved = JSON.parse(localStorage.getItem("wordle-clone.v1") ?? "{}");
    return { guesses: saved.round?.guesses?.length, played: saved.progress?.speed?.nature?.played, won: saved.progress?.speed?.nature?.won, lost: saved.progress?.speed?.nature?.lost };
  })).toEqual({ guesses: 0, played: 0, won: 0, lost: 0 });
  await expect(page.getByRole("combobox", { name: "Mode" })).toHaveValue("speed");
  await expect(page.getByRole("combobox", { name: "Category" })).toHaveValue("nature");
  await page.reload();
  await expect(page.getByRole("combobox", { name: "Mode" })).toHaveValue("speed");
  await expect(page.getByRole("combobox", { name: "Category" })).toHaveValue("nature");
});
