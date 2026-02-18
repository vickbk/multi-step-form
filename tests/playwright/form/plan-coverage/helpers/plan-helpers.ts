import type { Page } from "@playwright/test";
import { clickNextButton } from "@tests/playwright/form";
import type { PersonalInfoData, PlanOptions } from "@tests/playwright/shared";
import { clickLabelInput, shouldSee } from "@tests/playwright/shared";
import {
  ADVANCED_SELECTOR,
  ARCADE_SELECTOR,
  MONTHLY_SELECTOR,
  PICK_ADDONS_HEADING,
  PRO_SELECTOR,
  SELECT_PLAN_HEADING,
  YEARLY_SELECTOR,
} from "@tests/shared";
import { fillPersonalInfo } from "../../helpers/fill-steps";

export async function selectPlan(
  page: Page,
  {
    plan = ARCADE_SELECTOR,
    billing = MONTHLY_SELECTOR,
    personalInfo = {},
  }: PlanOptions = {},
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
  await selectPlan(page, {
    plan: ARCADE_SELECTOR,
    billing: MONTHLY_SELECTOR,
    personalInfo,
  });
}

export async function selectArcadeYearly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await selectPlan(page, {
    plan: ARCADE_SELECTOR,
    billing: YEARLY_SELECTOR,
    personalInfo,
  });
}

export async function selectAdvancedMonthly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await selectPlan(page, {
    plan: ADVANCED_SELECTOR,
    billing: MONTHLY_SELECTOR,
    personalInfo,
  });
}

export async function selectAdvancedYearly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await selectPlan(page, {
    plan: ADVANCED_SELECTOR,
    billing: YEARLY_SELECTOR,
    personalInfo,
  });
}

export async function selectProMonthly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await selectPlan(page, {
    plan: PRO_SELECTOR,
    billing: MONTHLY_SELECTOR,
    personalInfo,
  });
}

export async function selectProYearly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await selectPlan(page, {
    plan: PRO_SELECTOR,
    billing: YEARLY_SELECTOR,
    personalInfo,
  });
}
