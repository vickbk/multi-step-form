import { Page } from "@playwright/test";
import { asUser } from "./as-user";
import { setLocatorValue, setValueForLocators, shouldSee } from "./helpers";
import { LABEL_LOCATOR } from "./types";

const NAME: LABEL_LOCATOR = [/Name/i, "Test User"];
const INVALID_EMAIL: LABEL_LOCATOR = [/Email Address/i, "invalid-email"];
const PHONE_NUMBER: LABEL_LOCATOR = [/Phone Number/i, "1234567890"];
const VALID_EMAIL: LABEL_LOCATOR = [/Email Address/i, "test@example.com"];
const VALID_PHONE_NUMBER: LABEL_LOCATOR = [
  /Phone Number/i,
  "not-a-phone-number",
];

const TITLE = /Personal Info/i;
const REQUIRED_FIELD_ERROR = /This field is required/i;
const INVALID_EMAIL_ERROR = /Please enter a valid email/i;
const INVALID_PHONE_ERROR = /Please enter a valid phone number/i;

export async function seePersonalInfoErrors(page: Page) {
  await asUser(page);
  await page.locator("button", { hasText: /Next/i }).click();
  await shouldSee(page, [
    TITLE,
    REQUIRED_FIELD_ERROR,
    INVALID_EMAIL_ERROR,
    INVALID_PHONE_ERROR,
  ]);
}

export async function seeEmailError(page: Page) {
  await seePersonalInfoErrors(page);

  await setValueForLocators(page, [NAME, PHONE_NUMBER]);

  await page.locator("button", { hasText: /Next/i }).click();
  await shouldSee(page, [TITLE, INVALID_EMAIL_ERROR]);

  await setLocatorValue(page, INVALID_EMAIL);

  await page.locator("button", { hasText: /Next/i }).click();
  await shouldSee(page, [TITLE, INVALID_EMAIL_ERROR]);
}
