import { expect, test } from "@playwright/test";
import {
  clickBackButton,
  clickLabelInput,
  fillMonthlyPlanStep,
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
    await fillMonthlyPlanStep(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);

    await clickBackButton(page);
    await clickBackButton(page);
    await shouldSee(page, [INFO_TITLE]);

    const nameInput = page.locator('input[name="name"]');
    const expectedName = process.env.TEST_NAME || "Test User";
    await expect(nameInput).toHaveValue(expectedName);

    await navigateToStep(page, 2);

    await shouldSee(page, [SELECT_PLAN_HEADING]);
  });

  test("should preserve selections when navigating backwards from later steps", async ({
    page,
  }) => {
    await fillMonthlyPlanStep(page);

    await clickLabelInput(page, /pro/i);
    
    await navigateToStep(page, 3);
    await shouldSee(page, [PICK_ADDONS_HEADING]);
    await clickLabelInput(page, /online service/i);
    await clickLabelInput(page, /larger storage/i);

    await clickBackButton(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    const proRadio = page.locator('input[type="radio"][value="pro"]');
    await expect(proRadio).toBeChecked();

    await clickBackButton(page);
    await shouldSee(page, [INFO_TITLE]);

    await navigateToStep(page, 3);
    await shouldSee(page, [PICK_ADDONS_HEADING]);

    const onlineServiceCheckbox = page.locator('input[type="checkbox"][value="online-service"]');
    const largerStorageCheckbox = page.locator('input[type="checkbox"][value="larger-storage"]');
    await expect(onlineServiceCheckbox).toBeChecked();
    await expect(largerStorageCheckbox).toBeChecked();
  });
});
