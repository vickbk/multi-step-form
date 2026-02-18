import { expect, test } from "@playwright/test";
import {
  asUser,
  fillMonthlyPlanStep,
  fillPersonalInfo,
  fillYearlyPlanStep,
  FINISHING_UP_HEADING,
  INFO_TITLE,
  LARGER_STORAGE,
  ONLINE_SERVICE,
  PICK_ADDONS_HEADING,
  pickAddOns,
  proceedWithoutAddOns,
  REQUIRED_FIELD_ERROR,
  SELECT_PLAN_HEADING,
  shouldNotSee,
  shouldSee,
} from ".";

test.describe("Multi-step form", () => {
  test("should render the first step without errors", async ({ page }) => {
    await asUser(page);
    await expect(page).toHaveTitle(/multi-step form/i);
    await shouldSee(page, [INFO_TITLE, /Next/i]);
    await shouldNotSee(page, [REQUIRED_FIELD_ERROR]);
  });

  test("should fill the first step and navigate to the second step", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldNotSee(page, [INFO_TITLE]);
    await shouldSee(page, [SELECT_PLAN_HEADING]);
  });

  test("should select a monthly plan and navigate to the add-ons step", async ({
    page,
  }) => {
    await fillMonthlyPlanStep(page);
  });

  test("should select a yearly plan and navigate to the add-ons step", async ({
    page,
  }) => {
    await fillYearlyPlanStep(page);
    await expect(
      page.getByRole("heading", { name: PICK_ADDONS_HEADING }),
    ).toBeVisible();
  });

  test("should proceed to summary without add-ons", async ({ page }) => {
    await proceedWithoutAddOns(page);
    await expect(
      page.getByRole("heading", { name: FINISHING_UP_HEADING }),
    ).toBeVisible();
  });

  test("should pick two add-ons and navigate to the summary step", async ({
    page,
  }) => {
    const addOns = [ONLINE_SERVICE, LARGER_STORAGE];

    await pickAddOns(page, addOns);
    await shouldSee(page, [FINISHING_UP_HEADING, ...addOns]);
  });
});
