import { LABEL_LOCATOR } from "./types";

export const NAME_SELECTOR = /Name/i;
export const EMAIL_SELECTOR = /Email Address/i;
export const PHONE_SELECTOR = /Phone Number/i;

export const NAME: LABEL_LOCATOR = [NAME_SELECTOR, "Test User"];
export const INVALID_EMAIL: LABEL_LOCATOR = [EMAIL_SELECTOR, "invalid-email"];
export const PHONE_NUMBER: LABEL_LOCATOR = [PHONE_SELECTOR, "1234567890"];
export const VALID_EMAIL: LABEL_LOCATOR = [EMAIL_SELECTOR, "test@example.com"];
export const INVALID_PHONE_NUMBER: LABEL_LOCATOR = [
  PHONE_SELECTOR,
  "not-a-phone-number",
];

export const UPDATED_NAME = "updated name";
export const UPDATED_EMAIL = "updated@email.com";
export const UPDATED_PHONE = "01234567890";
export const JOHN_DOE = "John Doe";
export const JOHN_DOE_EMAIL = "john.doe@email.com";
export const JOHN_DOE_PHONE = "01234567890";

export const INFO_TITLE = /Personal Info/i;
export const REQUIRED_FIELD_ERROR = /This field is required/i;
export const INVALID_EMAIL_ERROR = /Please enter a valid email/i;
export const INVALID_PHONE_ERROR = /Please enter a valid phone number/i;
export const PLAN_ERROR = /Please choose your plan/i;
export const SELECT_PLAN_HEADING = /Select Your Plan/i;
export const PICK_ADDONS_HEADING = /Pick Add-ons/i;
export const FINISHING_UP_HEADING = /Finishing Up/i;
export const NO_ADDONS_SELECTED = /no add-ons selected/i;

export const ARCADE_SELECTOR = /Arcade/i;
export const PRO_SELECTOR = /Pro/i;
export const ADVANCED_SELECTOR = /Advanced/i;

export const MONTHLY_SELECTOR = /monthly/i;
export const YEARLY_SELECTOR = /yearly/i;

export const ARCADE_PLAN_MONTHLY = /Arcade \(per month\)/i;
export const PRO_PLAN_MONTHLY = /Pro \(per month\)/i;
export const ADVANCED_PLAN_MONTHLY = /Advanced \(per month\)/i;
export const ADVANCED_PLAN_YEARLY = /Advanced \(per year\)/i;
export const PRO_PLAN_YEARLY = /Pro \(per year\)/i;
export const ARCADE_PLAN_YEARLY = /Arcade \(per year\)/i;

export const ONLINE_SERVICE = /online service/i;
export const LARGER_STORAGE = /larger storage/i;
export const CUSTOMIZABLE_PROFILE = /customizable profile/i;

export const THANK_YOU_HEADING = /Thank you/i;
export const THANK_YOU_EMAIL = /support@loremgaming\.com/i;
export const SUBSCRIBE_ANOTHER = /Subscribe another account/i;

export const GO_BACK_BUTTON = /go back/i;
export const NEXT_BUTTON = /next step/i;
export const CONFIRM_BUTTON = /confirm/i;
