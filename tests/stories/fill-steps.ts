import { expect, Page } from "@playwright/test";
import { asUser } from "./as-user";

const {
  TEST_NAME = "test",
  TEST_EMAIL = "test@example.com",
  TEST_PHONE = "1234567890",
} = process.env;

export async function fillPersonalInfo(page: Page) {
  await asUser(page);

  const nameInput = page.getByRole("textbox", { name: "Name" });
  await nameInput.click();
  await nameInput.fill(TEST_NAME);

  const emailInput = page.getByRole("textbox", { name: "Email Address" });
  await emailInput.fill("invalid-email");
  await emailInput.press("Enter");

  const emailError = page.getByText("Please enter a valid email address");
  await expect(emailError).toBeVisible();

  await emailInput.fill(TEST_EMAIL);

  const phoneInput = page.getByRole("textbox", { name: "Phone Number" });
  await phoneInput.click();

  await phoneInput.fill(TEST_PHONE);
  await page.getByRole("button", { name: "Next Step" }).click();

  await expect(
    page.getByRole("heading", { name: /Select Your Plan/i }),
  ).toBeVisible();
}

export async function fillMonthlyPlanStep(page: Page) {
  await fillPersonalInfo(page);
  await expect(
    page.getByRole("heading", { name: /Select Your Plan/i }),
  ).toBeVisible();
  const arcadePlan = page.locator("label").filter({ hasText: /arcade plan/i });
  await arcadePlan.click();
  await page.getByRole("button", { name: /Next Step/i }).click();
  await expect(
    page.getByRole("heading", { name: /Pick Add-ons/i }),
  ).toBeVisible();
}
