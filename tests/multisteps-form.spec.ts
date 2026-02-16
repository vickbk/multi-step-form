import { expect, test } from "@playwright/test";
import {
  asUser,
  fillMonthlyPlanStep,
  fillPersonalInfo,
  fillYearlyPlanStep,
  pickAddOns,
  proceedWithoutAddOns,
  seeErrorMessageOnPlanSelection,
  shouldNotSee,
  shouldSee,
} from "./stories";

test.describe("Multi-step form", () => {
  test("should render the first step without errors", async ({ page }) => {
    await asUser(page);
    await expect(page).toHaveTitle(/multi-step form/i);
    await shouldSee(page, [/Personal Info/i, /Next/i]);
    await shouldNotSee(page, [/This field is required/i]);
  });

  test("should fill the first step and navigate to the second step", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldNotSee(page, [/Personal Info/i]);
    await shouldSee(page, [/Select Your Plan/i]);
  });

  test("should select a monthly plan and navigate to the add-ons step", async ({
    page,
  }) => {
    await fillMonthlyPlanStep(page);
  });

  test("should see an error message when trying to navigate to the next step without selecting a plan", async ({
    page,
  }) => {
    await seeErrorMessageOnPlanSelection(page);
  });

  test("should select a yearly plan and navigate to the add-ons step", async ({
    page,
  }) => {
    await fillYearlyPlanStep(page);
    await expect(
      page.getByRole("heading", { name: /Pick Add-ons/i }),
    ).toBeVisible();
  });

  test("should proceed to summary without add-ons", async ({ page }) => {
    await proceedWithoutAddOns(page);
    await expect(
      page.getByRole("heading", { name: /Finishing Up/i }),
    ).toBeVisible();
  });

  test("should pick two add-ons and navigate to the summary step", async ({
    page,
  }) => {
    const addOns = [/online service/i, /larger storage/i];

    await pickAddOns(page, addOns);
    await shouldSee(page, [/Finishing Up/i, ...addOns]);
  });
});
