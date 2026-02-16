import { expect, test } from "@playwright/test";
import {
  clickBackButton,
  fillMonthlyPlanStep,
  fillPersonalInfo,
  FINISHING_UP_HEADING,
  GO_BACK_BUTTON,
  INFO_TITLE,
  navigateToStep,
  PICK_ADDONS_HEADING,
  pickAddOns,
  SELECT_PLAN_HEADING,
  shouldNotSee,
  shouldSee,
} from "./stories";

test.describe("Multi-step form - navigation", () => {
  test("should navigate back through all steps using Go Back button", async ({
    page,
  }) => {
    await pickAddOns(page);

    // At step 4 (summary)
    await shouldSee(page, [FINISHING_UP_HEADING]);

    for (const step of [PICK_ADDONS_HEADING, SELECT_PLAN_HEADING, INFO_TITLE]) {
      await clickBackButton(page);
      await shouldSee(page, [step]);
    }

    // Verify Go Back button is hidden on first step
    await shouldNotSee(page, [GO_BACK_BUTTON]);
  });

  test("should navigate to different steps via sidebar buttons", async ({
    page,
  }) => {
    await pickAddOns(page);

    for (const [heading, stepNumber] of [
      [INFO_TITLE, 1],
      [PICK_ADDONS_HEADING, 3],
      [SELECT_PLAN_HEADING, 2],
      [FINISHING_UP_HEADING, 4],
    ] as const) {
      await navigateToStep(page, stepNumber);
      await shouldSee(page, [heading]);
    }
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
    await navigateToStep(page, 2);

    // Should still be at step 2 with previous selection visible
    await shouldSee(page, [SELECT_PLAN_HEADING]);
  });
});
