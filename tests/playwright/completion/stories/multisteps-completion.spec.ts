import { test } from "@playwright/test";
import {
  clickButton,
  completeFormSubmission,
  CONFIRM_BUTTON,
  INFO_TITLE,
  NEXT_BUTTON,
  shouldNotSee,
  shouldSee,
  SUBSCRIBE_ANOTHER,
  THANK_YOU_EMAIL,
  THANK_YOU_HEADING,
} from "@tests/playwright/shared";

test.describe("Multi-step form - completion", () => {
  test("should complete full form and see thank you page", async ({ page }) => {
    await completeFormSubmission(page);

    await shouldSee(page, [
      THANK_YOU_HEADING,
      THANK_YOU_EMAIL,
      SUBSCRIBE_ANOTHER,
    ]);
  });

  test("should reset form and return to step 1 after clicking subscribe another", async ({
    page,
  }) => {
    await completeFormSubmission(page);

    await shouldSee(page, [THANK_YOU_HEADING]);

    await clickButton(page, SUBSCRIBE_ANOTHER);

    await shouldSee(page, [INFO_TITLE, NEXT_BUTTON]);
    await shouldNotSee(page, [CONFIRM_BUTTON, SUBSCRIBE_ANOTHER]);
  });
});
