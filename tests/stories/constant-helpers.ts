import { LABEL_LOCATOR } from "./types";

export const NAME: LABEL_LOCATOR = [/Name/i, "Test User"];
export const INVALID_EMAIL: LABEL_LOCATOR = [/Email Address/i, "invalid-email"];
export const PHONE_NUMBER: LABEL_LOCATOR = [/Phone Number/i, "1234567890"];
export const VALID_EMAIL: LABEL_LOCATOR = [
  /Email Address/i,
  "test@example.com",
];
export const INVALID_PHONE_NUMBER: LABEL_LOCATOR = [
  /Phone Number/i,
  "not-a-phone-number",
];

export const INFO_TITLE = /Personal Info/i;
export const REQUIRED_FIELD_ERROR = /This field is required/i;
export const INVALID_EMAIL_ERROR = /Please enter a valid email/i;
export const INVALID_PHONE_ERROR = /Please enter a valid phone number/i;

export const PLAN_ERROR = /Please choose your plan/i;
