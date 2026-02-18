import { test } from "@playwright/test";
import {
  completeFormSubmission,
  FINISHING_UP_HEADING,
  INFO_TITLE,
  shouldSee,
  shouldNotSee,
  SUBSCRIBE_ANOTHER,
  THANK_YOU_EMAIL,
  THANK_YOU_HEADING,
} from ".";

test.describe("Multi-step form - completion", () => {
  test("should complete full form and see thank you page", async ({ page }) => {
    await completeFormSubmission(page);

    await shouldSee(page, [THANK_YOU_HEADING, THANK_YOU_EMAIL, SUBSCRIBE_ANOTHER]);
  });

  test("should reset form and return to step 1 after clicking subscribe another", async ({
    page,
  }) => {
    await completeFormSubmission(page);

    await shouldSee(page, [THANK_YOU_HEADING]);

    await page.getByRole("button", { name: SUBSCRIBE_ANOTHER }).click();

    await shouldSee(page, [INFO_TITLE, /next/i]);
    await shouldNotSee(page, [/confirm/i]);
  });
});
