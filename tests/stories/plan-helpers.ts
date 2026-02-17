import { Page } from "@playwright/test";
import {
  ADVANCED_SELECTOR,
  ARCADE_SELECTOR,
  MONTHLY_SELECTOR,
  PICK_ADDONS_HEADING,
  PRO_SELECTOR,
  SELECT_PLAN_HEADING,
  YEARLY_SELECTOR,
} from "./constant-helpers";
import { clickLabelInput, clickNextButton, shouldSee } from "./helpers";
import { fillPersonalInfo } from "./fill-steps";
import type { PersonalInfoData } from "./types";

export type PlanOptions = {
  plan?: typeof ARCADE_SELECTOR | typeof ADVANCED_SELECTOR | typeof PRO_SELECTOR;
  billing?: typeof MONTHLY_SELECTOR | typeof YEARLY_SELECTOR;
  personalInfo?: PersonalInfoData;
};

export async function selectPlan(
  page: Page,
  { plan = ARCADE_SELECTOR, billing = MONTHLY_SELECTOR, personalInfo = {} }: PlanOptions = {},
) {
  await fillPersonalInfo(page, personalInfo);
  await shouldSee(page, [SELECT_PLAN_HEADING]);

  if (billing === YEARLY_SELECTOR) {
    await clickLabelInput(page, YEARLY_SELECTOR);
  }
  await clickLabelInput(page, plan);
  await clickNextButton(page);

  await shouldSee(page, [PICK_ADDONS_HEADING]);
}

export async function selectArcadeMonthly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await selectPlan(page, { plan: ARCADE_SELECTOR, billing: MONTHLY_SELECTOR, personalInfo });
}

export async function selectArcadeYearly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await selectPlan(page, { plan: ARCADE_SELECTOR, billing: YEARLY_SELECTOR, personalInfo });
}

export async function selectAdvancedMonthly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await selectPlan(page, { plan: ADVANCED_SELECTOR, billing: MONTHLY_SELECTOR, personalInfo });
}

export async function selectAdvancedYearly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await selectPlan(page, { plan: ADVANCED_SELECTOR, billing: YEARLY_SELECTOR, personalInfo });
}

export async function selectProMonthly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await selectPlan(page, { plan: PRO_SELECTOR, billing: MONTHLY_SELECTOR, personalInfo });
}

export async function selectProYearly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await selectPlan(page, { plan: PRO_SELECTOR, billing: YEARLY_SELECTOR, personalInfo });
}
