import { Page } from "@playwright/test";
import { asUser } from "./as-user";
import {
  FINISHING_UP_HEADING,
  LARGER_STORAGE,
  NAME,
  NO_ADDONS_SELECTED,
  ONLINE_SERVICE,
  PICK_ADDONS_HEADING,
  PLAN_ERROR,
  SELECT_PLAN_HEADING,
  UPDATED_PHONE,
  VALID_EMAIL,
} from "./constant-helpers";
import {
  clickNextButton,
  fillLocatorWith,
  shouldNotSee,
  shouldSee,
} from "./helpers";

const {
  TEST_NAME = NAME[1],
  EMAIL_ADDRESS = VALID_EMAIL[1],
  PHONE_NUMBER = UPDATED_PHONE,
} = process.env;

export async function fillPersonalInfo(page: Page) {
  await asUser(page);

  await fillLocatorWith(page.locator("label", { hasText: /Name/i }), TEST_NAME);
  await fillLocatorWith(
    page.locator("label", { hasText: /Email Address/i }),
    EMAIL_ADDRESS,
  );

  await fillLocatorWith(
    page.locator("label", { hasText: /Phone Number/i }),
    PHONE_NUMBER,
  );

  await clickNextButton(page);
  await shouldSee(page, [SELECT_PLAN_HEADING]);
}

export async function fillMonthlyPlanStep(page: Page) {
  await fillPersonalInfo(page);
  await shouldSee(page, [SELECT_PLAN_HEADING]);

  const arcadePlan = page.locator("label", { hasText: /arcade plan/i });
  await arcadePlan.click();
  await clickNextButton(page);
  await shouldSee(page, [PICK_ADDONS_HEADING]);
}

export async function seeErrorMessageOnPlanSelection(page: Page) {
  await fillPersonalInfo(page);
  await shouldSee(page, [SELECT_PLAN_HEADING]);
  await clickNextButton(page);
  await shouldSee(page, [PLAN_ERROR]);
}

export async function fillYearlyPlanStep(page: Page) {
  await fillPersonalInfo(page);
  await shouldSee(page, [SELECT_PLAN_HEADING]);
  await page.getByText("yearly", { exact: true }).click();
  const advancedPlan = page.locator("label", {
    hasText: /advanced plan120\/yr2 months/i,
  });
  await advancedPlan.click();
  await clickNextButton(page);
  await shouldNotSee(page, [SELECT_PLAN_HEADING]);
}

export async function proceedWithoutAddOns(page: Page) {
  await fillMonthlyPlanStep(page);

  await shouldSee(page, [PICK_ADDONS_HEADING]);

  await clickNextButton(page);
  await shouldNotSee(page, [PICK_ADDONS_HEADING]);
  await shouldSee(page, [FINISHING_UP_HEADING, NO_ADDONS_SELECTED]);
}

export async function pickAddOns(
  page: Page,
  addOns = [ONLINE_SERVICE, LARGER_STORAGE],
) {
  await fillMonthlyPlanStep(page);

  for (const addOn of addOns) {
    await clickOnAddOn(page, addOn);
  }

  await clickNextButton(page);
  await shouldSee(page, [FINISHING_UP_HEADING, ...addOns]);
}

export async function clickOnAddOn(page: Page, addOn: RegExp | string) {
  await clickLabelInput(page, addOn);
}

export async function clickLabelInput(page: Page, labelText: RegExp | string) {
  const label = page.locator("label").filter({ hasText: labelText });
  await label.click();
}

export async function completeFormSubmission(page: Page) {
  await pickAddOns(page);
  await shouldSee(page, [FINISHING_UP_HEADING]);

  // Click confirm button
  await page.locator("button", { hasText: /Confirm/i }).click();
}
