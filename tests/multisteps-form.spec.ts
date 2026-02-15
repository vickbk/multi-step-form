import { expect, test } from "@playwright/test";
import { asUser, fillPersonalInfo } from "./stories";

test("should render the first step without errors", async ({ page }) => {
  await asUser(page);
  await expect(page).toHaveTitle(/multi-step form/i);
  await page.getByRole("heading", { name: /Personal Information/i });
  await page.getByRole("button", { name: /Next/i });
  await expect(page.getByText(/This field is required/i)).not.toBeVisible();
});

test("should not navigate to the second step without filling required fields and see error messages", async ({
  page,
}) => {
  await asUser(page);
  await page.getByRole("button", { name: /Next/i }).click();
  await page.getByRole("heading", { name: /Personal Information/i });
  await expect(page.getByText(/This field is required/i)).toBeVisible();
});

test("should fill the first step and navigate to the second step", async ({
  page,
}) => {
  await fillPersonalInfo(page);
});
