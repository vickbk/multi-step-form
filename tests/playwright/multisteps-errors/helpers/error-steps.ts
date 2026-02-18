import { Page } from "@playwright/test";
import {
  asUser,
  INFO_TITLE,
  INVALID_EMAIL,
  INVALID_EMAIL_ERROR,
  INVALID_PHONE_ERROR,
  INVALID_PHONE_NUMBER,
  NAME,
  PHONE_NUMBER,
  REQUIRED_FIELD_ERROR,
  VALID_EMAIL,
  clickNextButton,
  setLocatorValue,
  setValueForLocators,
  shouldSee,
} from "../../../shared/helpers";

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

  await setValueForLocators(page, [NAME, PHONE_NUMBER]);

  await page.locator("button", { hasText: /Next/i }).click();
  await shouldSee(page, [INFO_TITLE, INVALID_EMAIL_ERROR]);

  await setLocatorValue(page, INVALID_EMAIL);

  await page.locator("button", { hasText: /Next/i }).click();
  await shouldSee(page, [INFO_TITLE, INVALID_EMAIL_ERROR]);
}

export async function seePhoneNumberError(page: Page) {
  await seePersonalInfoErrors(page);

  await clickNextButton(page);

  await setValueForLocators(page, [NAME, VALID_EMAIL]);
  await clickNextButton(page);
  await shouldSee(page, [INFO_TITLE, INVALID_PHONE_ERROR]);

  await setLocatorValue(page, INVALID_PHONE_NUMBER);
  await clickNextButton(page);
  await shouldSee(page, [INFO_TITLE, INVALID_PHONE_ERROR]);
}
