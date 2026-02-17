import { Page } from "@playwright/test";
import {
  ADVANCED_SELECTOR,
  ARCADE_SELECTOR,
  MONTHLY_SELECTOR,
  PRO_SELECTOR,
  YEARLY_SELECTOR,
} from "./constant-helpers";
import { clickLabelInput, clickNextButton } from "./helpers";

export async function selectPlan(
  page: Page,
  plan: typeof ARCADE_SELECTOR | typeof ADVANCED_SELECTOR | typeof PRO_SELECTOR,
  billing: typeof MONTHLY_SELECTOR | typeof YEARLY_SELECTOR = MONTHLY_SELECTOR,
) {
  if (billing === YEARLY_SELECTOR) {
    await clickLabelInput(page, YEARLY_SELECTOR);
  }
  await clickLabelInput(page, plan);
  await clickNextButton(page);
}

export async function selectArcadeMonthly(page: Page) {
  await clickLabelInput(page, ARCADE_SELECTOR);
  await clickNextButton(page);
}

export async function selectArcadeYearly(page: Page) {
  await clickLabelInput(page, YEARLY_SELECTOR);
  await clickLabelInput(page, ARCADE_SELECTOR);
  await clickNextButton(page);
}

export async function selectAdvancedMonthly(page: Page) {
  await clickLabelInput(page, ADVANCED_SELECTOR);
  await clickNextButton(page);
}

export async function selectAdvancedYearly(page: Page) {
  await clickLabelInput(page, YEARLY_SELECTOR);
  await clickLabelInput(page, ADVANCED_SELECTOR);
  await clickNextButton(page);
}

export async function selectProMonthly(page: Page) {
  await clickLabelInput(page, PRO_SELECTOR);
  await clickNextButton(page);
}

export async function selectProYearly(page: Page) {
  await clickLabelInput(page, YEARLY_SELECTOR);
  await clickLabelInput(page, PRO_SELECTOR);
  await clickNextButton(page);
}
