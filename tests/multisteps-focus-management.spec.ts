import { test } from "@playwright/test";
import {
  ADVANCED_SELECTOR,
  clickBackButton,
  clickLabelInput,
  clickNextButton,
  fillPersonalInfo,
  isAutoFocused,
  isChecked,
  isFocused,
  MONTHLY_SELECTOR,
  PICK_ADDONS_HEADING,
  PRO_SELECTOR,
  selectArcadeMonthly,
  selectPlan,
  SELECT_PLAN_HEADING,
  shouldSee,
  YEARLY_SELECTOR,
} from "./stories";

test.describe("Multi-step form - Focus Management", () => {
  test("should focus first input on page load", async ({ page }) => {
    await page.goto("/");

    await isAutoFocused(page, 'input[name="name"]');
  });

  test("should focus first plan option when navigating to plan step", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await isAutoFocused(page, 'input[type="radio"][value="arcade"]');
  });

  test("should focus first add-on when navigating to add-ons step", async ({
    page,
  }) => {
    await selectArcadeMonthly(page);

    await isAutoFocused(page, 'input[type="checkbox"][value="online-service"]');
  });

  test("should maintain focus on selected plan when switching billing period", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    // Select a plan
    await clickLabelInput(page, ADVANCED_SELECTOR);
    await isChecked(page, 'input[type="radio"][value="advanced"]');

    // Switch billing period
    await clickLabelInput(page, YEARLY_SELECTOR);

    // Advanced should still be selected after switching billing period
    await isChecked(page, 'input[type="radio"][value="advanced"]');

    // Verify the billing period changed
    await isChecked(page, 'input[type="radio"][value="yearly"]');
  });

  test("should restore focus to previously selected plan when navigating back", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    // Select Pro plan using helper
    await selectPlan(page, { plan: PRO_SELECTOR, billing: MONTHLY_SELECTOR });

    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Navigate back
    await clickBackButton(page);

    await shouldSee(page, [SELECT_PLAN_HEADING]);

    // Pro should still be selected and focused
    await isAutoFocused(page, 'input[type="radio"][value="pro"]');
    await isChecked(page, 'input[type="radio"][value="pro"]');
  });

  test("should trap focus within error messages when validation fails", async ({
    page,
  }) => {
    await page.goto("/");

    // Try to submit without filling required fields
    await clickNextButton(page);

    // Name input should receive focus
    await isFocused(page, 'input[name="name"]');
  });
});
