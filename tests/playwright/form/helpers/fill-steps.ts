import type { Page } from "@playwright/test";
import type { PersonalInfoData } from "@tests/playwright/shared";
import {
  asUser,
  setValueForLocators,
  shouldSee,
} from "@tests/playwright/shared";
import {
  EMAIL_SELECTOR,
  NAME_LOCATOR,
  NAME_SELECTOR,
  PHONE_SELECTOR,
  SELECT_PLAN_HEADING,
  UPDATED_PHONE,
  VALID_EMAIL_LOCATOR,
} from "@tests/shared";
import { clickNextButton } from "../navigation";

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
