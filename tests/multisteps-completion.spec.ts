import { expect, test } from "@playwright/test";
import {
  completeFormSubmission,
  FINISHING_UP_HEADING,
  shouldSee,
  SUBSCRIBE_ANOTHER,
  THANK_YOU_EMAIL,
  THANK_YOU_HEADING,
} from "./stories";

test.describe("Multi-step form - completion", () => {
  test("should complete full form and see thank you page", async ({ page }) => {
    await completeFormSubmission(page);

    // Verify thank you page is displayed
    await shouldSee(page, [THANK_YOU_HEADING, THANK_YOU_EMAIL]);

    // Verify "Subscribe another account" button exists
    await expect(
      page.getByRole("button", { name: SUBSCRIBE_ANOTHER }),
    ).toBeVisible();
  });

  test("should reset form and return to step 1 after clicking subscribe another", async ({
    page,
  }) => {
    await completeFormSubmission(page);

    // On thank you page
    await shouldSee(page, [THANK_YOU_HEADING]);

    // Click reset button
    await page.getByRole("button", { name: SUBSCRIBE_ANOTHER }).click();

    // Should be back at step 1
    await expect(
      page.getByRole("heading", { name: /personal info/i }),
    ).toBeVisible();

    // Verify we're on step 1 (Next button should be visible, not Confirm)
    await expect(page.getByRole("button", { name: /next/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /confirm/i }),
    ).not.toBeVisible();
  });
});
