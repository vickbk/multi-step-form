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
import { fillPersonalInfo, PersonalInfoData } from "./fill-steps";

export async function selectPlan(
  page: Page,
  plan: typeof ARCADE_SELECTOR | typeof ADVANCED_SELECTOR | typeof PRO_SELECTOR,
  billing: typeof MONTHLY_SELECTOR | typeof YEARLY_SELECTOR = MONTHLY_SELECTOR,
  personalInfo: PersonalInfoData = {},
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
  await fillPersonalInfo(page, personalInfo);
  await shouldSee(page, [SELECT_PLAN_HEADING]);

  await clickLabelInput(page, ARCADE_SELECTOR);
  await clickNextButton(page);

  await shouldSee(page, [PICK_ADDONS_HEADING]);
}

export async function selectArcadeYearly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await fillPersonalInfo(page, personalInfo);
  await shouldSee(page, [SELECT_PLAN_HEADING]);

  await clickLabelInput(page, YEARLY_SELECTOR);
  await clickLabelInput(page, ARCADE_SELECTOR);
  await clickNextButton(page);

  await shouldSee(page, [PICK_ADDONS_HEADING]);
}

export async function selectAdvancedMonthly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await fillPersonalInfo(page, personalInfo);
  await shouldSee(page, [SELECT_PLAN_HEADING]);

  await clickLabelInput(page, ADVANCED_SELECTOR);
  await clickNextButton(page);

  await shouldSee(page, [PICK_ADDONS_HEADING]);
}

export async function selectAdvancedYearly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await fillPersonalInfo(page, personalInfo);
  await shouldSee(page, [SELECT_PLAN_HEADING]);

  await clickLabelInput(page, YEARLY_SELECTOR);
  await clickLabelInput(page, ADVANCED_SELECTOR);
  await clickNextButton(page);

  await shouldSee(page, [PICK_ADDONS_HEADING]);
}

export async function selectProMonthly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await fillPersonalInfo(page, personalInfo);
  await shouldSee(page, [SELECT_PLAN_HEADING]);

  await clickLabelInput(page, PRO_SELECTOR);
  await clickNextButton(page);

  await shouldSee(page, [PICK_ADDONS_HEADING]);
}

export async function selectProYearly(
  page: Page,
  personalInfo: PersonalInfoData = {},
) {
  await fillPersonalInfo(page, personalInfo);
  await shouldSee(page, [SELECT_PLAN_HEADING]);

  await clickLabelInput(page, YEARLY_SELECTOR);
  await clickLabelInput(page, PRO_SELECTOR);
  await clickNextButton(page);

  await shouldSee(page, [PICK_ADDONS_HEADING]);
}
