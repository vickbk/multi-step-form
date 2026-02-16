import test from "@playwright/test";
import { asUser, shouldSee } from "./stories";

test.describe("Multi-step form - errors", () => {
  test("should not navigate to the second step without filling required fields and see error messages", async ({
    page,
  }) => {
    await asUser(page);
    await page.locator("button", { hasText: /Next/i }).click();
    await shouldSee(page, [/Personal Info/i, /This field is required/i]);
  });
});
