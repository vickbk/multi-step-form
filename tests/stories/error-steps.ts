import type { Page } from "@playwright/test";
import { asUser } from "./as-user";
import {
  INFO_TITLE,
  INVALID_EMAIL_ERROR,
  INVALID_EMAIL_LOCATOR,
  INVALID_PHONE_ERROR,
  INVALID_PHONE_NUMBER_LOCATOR,
  NAME_LOCATOR,
  PHONE_NUMBER_LOCATOR,
  REQUIRED_FIELD_ERROR,
  VALID_EMAIL_LOCATOR,
} from "./constant-helpers";
import {
  clickNextButton,
  setLocatorValue,
  setValueForLocators,
  shouldSee,
} from "./helpers";

export async function seePersonalInfoErrors(page: Page) {
  await asUser(page);
  await page.locator("button", { hasText: /Next/i }).click();
  await shouldSee(page, [
    INFO_TITLE,
    REQUIRED_FIELD_ERROR,
    INVALID_EMAIL_ERROR,
    INVALID_PHONE_ERROR,
  ]);
}

export async function seeEmailError(page: Page) {
  await seePersonalInfoErrors(page);

  await setValueForLocators(page, [NAME_LOCATOR, PHONE_NUMBER_LOCATOR]);

  await page.locator("button", { hasText: /Next/i }).click();
  await shouldSee(page, [INFO_TITLE, INVALID_EMAIL_ERROR]);

  await setLocatorValue(page, INVALID_EMAIL_LOCATOR);

  await page.locator("button", { hasText: /Next/i }).click();
  await shouldSee(page, [INFO_TITLE, INVALID_EMAIL_ERROR]);
}

export async function seePhoneNumberError(page: Page) {
  await seePersonalInfoErrors(page);

  await clickNextButton(page);

  await setValueForLocators(page, [NAME_LOCATOR, VALID_EMAIL_LOCATOR]);
  await clickNextButton(page);
  await shouldSee(page, [INFO_TITLE, INVALID_PHONE_ERROR]);

  await setLocatorValue(page, INVALID_PHONE_NUMBER_LOCATOR);
  await clickNextButton(page);
  await shouldSee(page, [INFO_TITLE, INVALID_PHONE_ERROR]);
}
