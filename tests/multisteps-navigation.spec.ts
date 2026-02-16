import { expect, test } from "@playwright/test";
import {
  clickBackButton,
  fillPersonalInfo,
  fillMonthlyPlanStep,
  FINISHING_UP_HEADING,
  INFO_TITLE,
  PICK_ADDONS_HEADING,
  pickAddOns,
  SELECT_PLAN_HEADING,
  shouldSee,
  shouldNotSee,
} from "./stories";

test.describe("Multi-step form - navigation", () => {
  test("should navigate back through all steps using Go Back button", async ({
    page,
  }) => {
    await pickAddOns(page);

    // At step 4 (summary)
    await shouldSee(page, [FINISHING_UP_HEADING]);

    // Go back to step 3
    await clickBackButton(page);
    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Go back to step 2
    await clickBackButton(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    // Go back to step 1
    await clickBackButton(page);
    await shouldSee(page, [INFO_TITLE]);

    // Verify Go Back button is hidden on first step
    await shouldNotSee(page, [/go back/i]);
  });

  test("should navigate to different steps via sidebar buttons", async ({
    page,
  }) => {
    await pickAddOns(page);

    // At step 4, click step 1 in sidebar
    await page.getByRole("button", { name: "1" }).click();
    await shouldSee(page, [INFO_TITLE]);

    // Click step 3 in sidebar
    await page.getByRole("button", { name: "3" }).click();
    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Click step 2 in sidebar
    await page.getByRole("button", { name: "2" }).click();
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    // Click step 4 in sidebar
    await page.getByRole("button", { name: "4" }).click();
    await shouldSee(page, [FINISHING_UP_HEADING]);
  });

  test("should preserve form data when navigating back and forth", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await fillMonthlyPlanStep(page);

    // Should be at step 3 now
    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Go back to step 1
    await clickBackButton(page);
    await clickBackButton(page);
    await shouldSee(page, [INFO_TITLE]);

    // Verify personal info is preserved with the correct values from environment
    const nameInput = page.locator('input[name="name"]');
    const expectedName = process.env.TEST_NAME || "Test User";
    await expect(nameInput).toHaveValue(expectedName);

    // Navigate forward again
    await page.getByRole("button", { name: /next/i }).click();

    // Should still be at step 2 with previous selection visible
    await shouldSee(page, [SELECT_PLAN_HEADING]);
  });
});
