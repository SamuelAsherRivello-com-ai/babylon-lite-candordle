import { expect, test } from "@playwright/test";

test("physical Enter submits once after clicking a letter key", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole("button", { name: "Start Game", exact: true }).click();
  for (const letter of "AROSE") await page.getByRole("button", { name: letter, exact: true }).click();
  await page.keyboard.press("Enter");
  await expect(page.locator(".row").first()).toHaveText("AROSE");
  await expect(page.locator(".row").nth(1)).toHaveText("");
});
