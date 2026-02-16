import test from "@playwright/test";
import { shouldSee } from "./stories";
import { seeEmailError, seePersonalInfoErrors } from "./stories/error-steps";

test.describe("Multi-step form - errors", () => {
  test("should not navigate to the second step without filling required fields and see error messages", async ({
    page,
  }) => {
    await seePersonalInfoErrors(page);
    await shouldSee(page, [
      /Personal Info/i,
      /This field is required/i,
      /Please enter a valid email/i,
      /Please enter a valid phone number/i,
    ]);
  });

  test("should see error message when trying to proceed without an email or with an invalid email", async ({
    page,
  }) => {
    await seeEmailError(page);
    await shouldSee(page, [/Personal Info/i, /Please enter a valid email/i]);
  });
});
