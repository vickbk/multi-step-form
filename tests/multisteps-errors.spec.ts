import test from "@playwright/test";
import { shouldSee } from "./stories";
import {
  INFO_TITLE,
  INVALID_EMAIL_ERROR,
  INVALID_PHONE_ERROR,
  REQUIRED_FIELD_ERROR,
} from "./stories/constant-helpers";
import {
  seeEmailError,
  seePersonalInfoErrors,
  seePhoneNumberError,
} from "./stories/error-steps";

test.describe("Multi-step form - errors", () => {
  test("should not navigate to the second step without filling required fields and see error messages", async ({
    page,
  }) => {
    await seePersonalInfoErrors(page);
    await shouldSee(page, [
      INFO_TITLE,
      REQUIRED_FIELD_ERROR,
      INVALID_EMAIL_ERROR,
      INVALID_PHONE_ERROR,
    ]);
  });

  test("should see error message when trying to proceed without an email or with an invalid email", async ({
    page,
  }) => {
    await seeEmailError(page);
    await shouldSee(page, [INFO_TITLE, INVALID_EMAIL_ERROR]);
  });

  test("should see error message when trying to proceed without a phone number or with an invalid phone number", async ({
    page,
  }) => {
    await seePhoneNumberError(page);
    await shouldSee(page, [INFO_TITLE, INVALID_PHONE_ERROR]);
  });
});
