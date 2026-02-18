import { checkboxTemp, inputTemp, radioTemp } from "./templating-helper";
import type { LABEL_LOCATOR } from "../types";

export const NAME_SELECTOR = /Name/i;
export const EMAIL_SELECTOR = /Email Address/i;
export const PHONE_SELECTOR = /Phone Number/i;

export const TEST_NAME = "Test User";
export const TEST_EMAIL = "test@email.com";
export const TEST_PHONE = "1234567890";
export const VALID_DASHED_PHONE = "123-456-7890";
export const VALID_SPACED_PHONE = "123 456 7890";
export const VALID_PARENTHESIZED_PHONE = "(123) 456-7890";
export const VALID_PHONES = [
  VALID_DASHED_PHONE,
  VALID_SPACED_PHONE,
  VALID_PARENTHESIZED_PHONE,
  TEST_PHONE,
];
export const INVALID_EMAIL = "invalid-email";
export const VALID_PLUS_EMAIL = "test+tag@email.com";
export const INVALID_SPACED_EMAIL = "test test@email.com";
export const INVALID_PHONE = "not-a-phone-number";

export const NAME_LOCATOR: LABEL_LOCATOR = [NAME_SELECTOR, TEST_NAME];
export const INVALID_EMAIL_LOCATOR: LABEL_LOCATOR = [
  EMAIL_SELECTOR,
  INVALID_EMAIL,
];
export const INVALID_SPACED_EMAIL_LOCATOR: LABEL_LOCATOR = [
  EMAIL_SELECTOR,
  INVALID_SPACED_EMAIL,
];
export const PHONE_NUMBER_LOCATOR: LABEL_LOCATOR = [PHONE_SELECTOR, TEST_PHONE];
export const VALID_EMAIL_LOCATOR: LABEL_LOCATOR = [EMAIL_SELECTOR, TEST_EMAIL];
export const INVALID_PHONE_NUMBER_LOCATOR: LABEL_LOCATOR = [
  PHONE_SELECTOR,
  INVALID_PHONE,
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
export const CHANGE_BUTTON = /change/i;

export const NAME_INPUT = inputTemp(["name"]);
export const EMAIL_INPUT = inputTemp(["email"]);
export const PHONE_INPUT = inputTemp(["phone"]);

export const ARCADE_RADIO_INPUT = radioTemp("arcade");
export const ADVANCED_RADIO_INPUT = radioTemp("advanced");
export const PRO_RADIO_INPUT = radioTemp("pro");

export const MONTHLY_RADIO_INPUT = radioTemp("monthly");
export const YEARLY_RADIO_INPUT = radioTemp("yearly");

export const ONLINE_SERVICE_CHECKBOX = checkboxTemp("online-service");
export const LARGER_STORAGE_CHECKBOX = checkboxTemp("larger-storage");
export const CUSTOMIZABLE_PROFILE_CHECKBOX = checkboxTemp(
  "customizable-profile",
);

export const ONLINE_SERVICE_VALUE = "online-service";
export const LARGER_STORAGE_VALUE = "larger-storage";
export const CUSTOMIZABLE_PROFILE_VALUE = "customizable-profile";
