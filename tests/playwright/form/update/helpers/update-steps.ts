import type { Page } from "@playwright/test";
import { clickNextButton, pickAddOns } from "@tests/playwright/form";
import {
  ARCADE_SELECTOR,
  CHANGE_BUTTON,
  CUSTOMIZABLE_PROFILE,
  EMAIL_SELECTOR,
  FINISHING_UP_HEADING,
  LARGER_STORAGE,
  MONTHLY_SELECTOR,
  NAME_SELECTOR,
  ONLINE_SERVICE,
  PHONE_SELECTOR,
  PICK_ADDONS_HEADING,
  PRO_SELECTOR,
  SELECT_PLAN_HEADING,
  UPDATED_EMAIL,
  UPDATED_NAME,
  UPDATED_PHONE,
} from "@tests/shared";

import {
  clickLabelInput,
  getButton,
  setValueForLocators,
  shouldSee,
} from "@tests/playwright/shared";

export async function updatePersonalInfo(
  page: Page,
  { name = UPDATED_NAME, email = UPDATED_EMAIL, phone = UPDATED_PHONE } = {},
) {
  await pickAddOns(page);
  await clickChangeButton(page, "personal info");
  await setValueForLocators(page, [
    [NAME_SELECTOR, name],
    [EMAIL_SELECTOR, email],
    [PHONE_SELECTOR, phone],
  ]);

  await clickNextButton(page);

  await shouldSee(page, [SELECT_PLAN_HEADING]);

  const step4 = page.locator("button", { hasText: /4/i });
  await step4.click();
  await shouldSee(page, [FINISHING_UP_HEADING]);
}

export async function updatePlan(
  page: Page,
  { billing = MONTHLY_SELECTOR, plan = PRO_SELECTOR } = {},
) {
  await pickAddOns(page);
  await shouldSee(page, [ARCADE_SELECTOR]);

  await clickChangeButton(page, "plan");
  await shouldSee(page, [SELECT_PLAN_HEADING]);

  await page.locator("label", { hasText: plan }).click();
  await page.locator("label", { hasText: billing }).click();

  const step4 = page.locator("button", { hasText: /4/i });

  await step4.click();
  await shouldSee(page, [FINISHING_UP_HEADING]);
}

export async function updateAddOns(
  page: Page,
  addOns = [ONLINE_SERVICE, LARGER_STORAGE, CUSTOMIZABLE_PROFILE],
) {
  const initialAddOns = [ONLINE_SERVICE, LARGER_STORAGE];
  await pickAddOns(page, initialAddOns);
  await shouldSee(page, initialAddOns);

  await clickChangeButton(page, "add-ons");

  await shouldSee(page, [PICK_ADDONS_HEADING]);

  for (const addOn of initialAddOns) {
    await clickLabelInput(page, addOn);
  }

  for (const addOn of addOns) {
    await clickLabelInput(page, addOn);
  }

  await clickNextButton(page);

  await shouldSee(page, [FINISHING_UP_HEADING, ...addOns]);
}

export async function clickChangeButton(
  page: Page,
  step: "personal info" | "plan" | "add-ons" | number,
) {
  const stepIndex =
    typeof step === "number"
      ? step
      : { "personal info": 0, plan: 1, "add-ons": 2 }[step];
  return getButton(page, CHANGE_BUTTON).nth(stepIndex).click();
}
