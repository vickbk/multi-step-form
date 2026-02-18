import type { Page } from "@playwright/test";
import { asUser } from "./as-user";
import {
  ADVANCED_SELECTOR,
  ARCADE_SELECTOR,
  CONFIRM_BUTTON,
  EMAIL_SELECTOR,
  FINISHING_UP_HEADING,
  LARGER_STORAGE,
  NAME_LOCATOR,
  NAME_SELECTOR,
  NO_ADDONS_SELECTED,
  ONLINE_SERVICE,
  PHONE_SELECTOR,
  PICK_ADDONS_HEADING,
  SELECT_PLAN_HEADING,
  THANK_YOU_HEADING,
  UPDATED_PHONE,
  VALID_EMAIL_LOCATOR,
  YEARLY_SELECTOR,
} from "./constant-helpers";
import {
  clickButton,
  clickMultipleLabelInputs,
  clickNextButton,
  setValueForLocators,
  shouldNotSee,
  shouldSee,
} from "./helpers";
import { selectPlan } from "./plan-helpers";
import type { PersonalInfoData } from "./types";

const {
  TEST_NAME = NAME_LOCATOR[1],
  EMAIL_ADDRESS = VALID_EMAIL_LOCATOR[1],
  PHONE_NUMBER = UPDATED_PHONE,
} = process.env;

export async function fillPersonalInfo(
  page: Page,
  {
    name = TEST_NAME,
    email = EMAIL_ADDRESS,
    phone = PHONE_NUMBER,
  }: PersonalInfoData = {},
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
  await selectPlan(page, { plan: ARCADE_SELECTOR });
  await shouldSee(page, [PICK_ADDONS_HEADING]);
}

export async function fillYearlyPlanStep(page: Page) {
  await selectPlan(page, {
    plan: ADVANCED_SELECTOR,
    billing: YEARLY_SELECTOR,
  });
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

  await clickMultipleLabelInputs(page, addOns);

  await clickNextButton(page);
  await shouldSee(page, [FINISHING_UP_HEADING, ...addOns]);
}

export async function completeFormSubmission(page: Page) {
  await pickAddOns(page);
  await shouldSee(page, [FINISHING_UP_HEADING]);
  await clickButton(page, CONFIRM_BUTTON);
  await shouldSee(page, [THANK_YOU_HEADING]);
}
