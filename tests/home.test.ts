import { expect, test } from "@playwright/test"

//
;["Dice", "Cards", "Numbers"].forEach((buttonText) => {
  test("Home page has button " + buttonText, async ({ page }) => {
    await page.goto("/")
    await expect(page.getByText(buttonText)).toBeVisible()
  })
})
