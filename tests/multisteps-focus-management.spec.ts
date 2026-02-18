import { test } from "@playwright/test";
import {
  ADVANCED_RADIO_INPUT,
  ADVANCED_SELECTOR,
  ARCADE_RADIO_INPUT,
  clickBackButton,
  clickLabelInput,
  clickNextButton,
  fillPersonalInfo,
  isAutoFocused,
  isChecked,
  isFocused,
  MONTHLY_SELECTOR,
  NAME_INPUT,
  ONLINE_SERVICE_CHECKBOX,
  PICK_ADDONS_HEADING,
  PRO_RADIO_INPUT,
  PRO_SELECTOR,
  selectArcadeMonthly,
  selectPlan,
  SELECT_PLAN_HEADING,
  shouldSee,
  YEARLY_RADIO_INPUT,
  YEARLY_SELECTOR,
} from "./stories";

test.describe("Multi-step form - Focus Management", () => {
  test("should focus first input on page load", async ({ page }) => {
    await page.goto("/");

    await isAutoFocused(page, NAME_INPUT);
  });

  test("should focus first plan option when navigating to plan step", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await isAutoFocused(page, ARCADE_RADIO_INPUT);
  });

  test("should focus first add-on when navigating to add-ons step", async ({
    page,
  }) => {
    await selectArcadeMonthly(page);

    await isAutoFocused(page, ONLINE_SERVICE_CHECKBOX);
  });

  test("should maintain focus on selected plan when switching billing period", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await clickLabelInput(page, ADVANCED_SELECTOR);
    await isChecked(page, ADVANCED_RADIO_INPUT);

    await clickLabelInput(page, YEARLY_SELECTOR);

    await isChecked(page, ADVANCED_RADIO_INPUT);
    await isChecked(page, YEARLY_RADIO_INPUT);
  });

  test("should restore focus to previously selected plan when navigating back", async ({
    page,
  }) => {
    await selectPlan(page, {
      plan: PRO_SELECTOR,
      billing: MONTHLY_SELECTOR,
    });

    await shouldSee(page, [PICK_ADDONS_HEADING]);
    await clickBackButton(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await isAutoFocused(page, PRO_RADIO_INPUT);
    await isChecked(page, PRO_RADIO_INPUT);
  });

  test("should trap focus within error messages when validation fails", async ({
    page,
  }) => {
    await page.goto("/");

    await clickNextButton(page);

    await isFocused(page, NAME_INPUT);
  });
});
