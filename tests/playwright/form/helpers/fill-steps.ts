import type { Page } from "@playwright/test";
import type { PersonalInfoData } from "@tests/playwright/shared";
import {
  asUser,
  clickMultipleLabelInputs,
  setValueForLocators,
  shouldNotSee,
  shouldSee,
} from "@tests/playwright/shared";
import {
  ADVANCED_SELECTOR,
  ARCADE_SELECTOR,
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
  UPDATED_PHONE,
  VALID_EMAIL_LOCATOR,
  YEARLY_SELECTOR,
} from "@tests/shared";
import { clickNextButton } from "../navigation";
import { selectPlan } from "../plan-coverage";

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
