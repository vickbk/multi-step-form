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

  test("should preserve selections when navigating backwards from later steps", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    // Move to step 2 and select a plan
    await shouldSee(page, [SELECT_PLAN_HEADING]);
    await page.locator("label", { hasText: /pro/i }).click();
    
    // Move to step 3 and select add-ons
    await navigateToStep(page, 3);
    await shouldSee(page, [PICK_ADDONS_HEADING]);
    await page.locator("label", { hasText: /online service/i }).click();
    await page.locator("label", { hasText: /larger storage/i }).click();

    // Navigate backwards to step 2
    await clickBackButton(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    // Verify Pro plan is still selected
    const proRadio = page.locator('input[type="radio"][value="pro"]');
    await expect(proRadio).toBeChecked();

    // Navigate backwards to step 1
    await clickBackButton(page);
    await shouldSee(page, [INFO_TITLE]);

    // Navigate forward to step 3 again
    await navigateToStep(page, 3);
    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Verify add-ons are still selected
    const onlineServiceCheckbox = page.locator('input[type="checkbox"][value="online-service"]');
    const largerStorageCheckbox = page.locator('input[type="checkbox"][value="larger-storage"]');
    await expect(onlineServiceCheckbox).toBeChecked();
    await expect(largerStorageCheckbox).toBeChecked();
  });
});
