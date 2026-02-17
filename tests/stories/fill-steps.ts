import { Page } from "@playwright/test";
import { asUser } from "./as-user";
import {
  FINISHING_UP_HEADING,
  LARGER_STORAGE,
  NAME,
  NAME_SELECTOR,
  EMAIL_SELECTOR,
  PHONE_SELECTOR,
  NO_ADDONS_SELECTED,
  ONLINE_SERVICE,
  PICK_ADDONS_HEADING,
  PLAN_ERROR,
  SELECT_PLAN_HEADING,
  UPDATED_PHONE,
  VALID_EMAIL,
} from "./constant-helpers";
import {
  clickLabelInput,
  clickNextButton,
  fillLocatorWith,
  setValueForLocators,
  shouldNotSee,
  shouldSee,
} from "./helpers";
import type { PersonalInfoData } from "./types";

const {
  TEST_NAME = NAME[1],
  EMAIL_ADDRESS = VALID_EMAIL[1],
  PHONE_NUMBER = UPDATED_PHONE,
} = process.env;

export async function fillPersonalInfo(
  page: Page,
  { name = TEST_NAME, email = EMAIL_ADDRESS, phone = PHONE_NUMBER }: PersonalInfoData = {},
) {
  await asUser(page);

  await setValueForLocators(page, [
    [NAME_SELECTOR, name],
    [EMAIL_SELECTOR, email],
    [PHONE_SELECTOR, phone],
  ]);

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
    await clickLabelInput(page, addOn);
  }

  await clickNextButton(page);
  await shouldSee(page, [FINISHING_UP_HEADING, ...addOns]);
}

export async function completeFormSubmission(page: Page) {
  await pickAddOns(page);
  await shouldSee(page, [FINISHING_UP_HEADING]);

  await page.locator("button", { hasText: /Confirm/i }).click();
}
