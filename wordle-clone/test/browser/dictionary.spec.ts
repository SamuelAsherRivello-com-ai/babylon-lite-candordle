import { expect, test } from "@playwright/test";

const commonWords = ["HAPPY","ABOUT","ABOVE","ADEPT","AFTER","AGAIN","ALIVE","APPLE","BEACH","BRAIN","BREAD","BRING","BROKE","CARRY","CHAIR","CHILD","CLEAN","CLOUD","DANCE","DREAM","EARTH","ENJOY","EVERY","FIRST","FRUIT","GLASS","GRASS","GREEN","GROUP","HONEY","HORSE","HOUSE","IMAGE","JUICE","LEARN","LEMON","LIGHT","MONEY","MUSIC","NIGHT","OCEAN","PARTY","PEACE","PHONE","PLANT","RIVER","SHEEP","SMILE","STONE","TABLE","WATER"];

test("HAPPY and common five-letter words are accepted guesses", async ({ page }) => {
  for (const word of commonWords) {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    for (const letter of word) await page.getByRole("button", { name: letter, exact: true }).click();
    await page.getByRole("button", { name: "Enter", exact: true }).click();
    await expect(page.getByRole("status")).not.toContainText("not in the common-word list");
    await expect(page.getByRole("status")).toContainText(/Guess recorded|Brilliant|The word was/);
  }
});
