import { expect, test } from "@playwright/test";
import { expectCheckboxesChecked } from "@tests/playwright/addon-deselection/helpers";
import {
  fillMonthlyPlanStep,
  fillPersonalInfo,
  pickAddOns,
} from "@tests/playwright/form";
import {
  clickLabelInput,
  clickMultipleLabelInputs,
  FINISHING_UP_HEADING,
  GO_BACK_BUTTON,
  INFO_TITLE,
  isChecked,
  LARGER_STORAGE,
  LARGER_STORAGE_CHECKBOX,
  NAME_INPUT,
  ONLINE_SERVICE,
  ONLINE_SERVICE_CHECKBOX,
  PICK_ADDONS_HEADING,
  PRO_RADIO_INPUT,
  PRO_SELECTOR,
  SELECT_PLAN_HEADING,
  shouldNotSee,
  shouldSee,
  TEST_NAME,
} from "@tests/playwright/shared";
import { clickBackButton, navigateToStep } from "../helpers";

test.describe("Multi-step form - navigation", () => {
  test("should navigate back through all steps using Go Back button", async ({
    page,
  }) => {
    await pickAddOns(page);

    await shouldSee(page, [FINISHING_UP_HEADING]);

    for (const step of [PICK_ADDONS_HEADING, SELECT_PLAN_HEADING, INFO_TITLE]) {
      await clickBackButton(page);
      await shouldSee(page, [step]);
    }

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

    const nameInput = page.locator(NAME_INPUT);
    const expectedName = process.env.TEST_NAME || TEST_NAME;
    await expect(nameInput).toHaveValue(expectedName);

    await navigateToStep(page, 2);

    await shouldSee(page, [SELECT_PLAN_HEADING]);
  });

  test("should preserve selections when navigating backwards from later steps", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await clickLabelInput(page, PRO_SELECTOR);

    await navigateToStep(page, 3);
    await shouldSee(page, [PICK_ADDONS_HEADING]);
    await clickMultipleLabelInputs(page, [ONLINE_SERVICE, LARGER_STORAGE]);

    await clickBackButton(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await isChecked(page, PRO_RADIO_INPUT);

    await clickBackButton(page);
    await shouldSee(page, [INFO_TITLE]);

    await navigateToStep(page, 3);
    await shouldSee(page, [PICK_ADDONS_HEADING]);

    await expectCheckboxesChecked(page, [
      ONLINE_SERVICE_CHECKBOX,
      LARGER_STORAGE_CHECKBOX,
    ]);
  });
});
