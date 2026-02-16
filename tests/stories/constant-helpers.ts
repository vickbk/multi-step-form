import { LABEL_LOCATOR } from "./types";
export {
  INFO_TITLE,
  INVALID_EMAIL,
  INVALID_EMAIL_ERROR,
  INVALID_PHONE_ERROR,
  INVALID_PHONE_NUMBER,
  NAME,
  PHONE_NUMBER,
  REQUIRED_FIELD_ERROR,
  VALID_EMAIL,
};

const NAME: LABEL_LOCATOR = [/Name/i, "Test User"];
const INVALID_EMAIL: LABEL_LOCATOR = [/Email Address/i, "invalid-email"];
const PHONE_NUMBER: LABEL_LOCATOR = [/Phone Number/i, "1234567890"];
const VALID_EMAIL: LABEL_LOCATOR = [/Email Address/i, "test@example.com"];
const INVALID_PHONE_NUMBER: LABEL_LOCATOR = [
  /Phone Number/i,
  "not-a-phone-number",
];

const INFO_TITLE = /Personal Info/i;
const REQUIRED_FIELD_ERROR = /This field is required/i;
const INVALID_EMAIL_ERROR = /Please enter a valid email/i;
const INVALID_PHONE_ERROR = /Please enter a valid phone number/i;
