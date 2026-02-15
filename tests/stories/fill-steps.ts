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

export async function seeErrorMessageOnPlanSelection(page: Page) {
  await fillPersonalInfo(page);
  await expect(
    page.getByRole("heading", { name: /Select Your Plan/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Next Step/i }).click();
  await expect(page.getByText(/Please choose your plan/i)).toBeVisible();
}

export async function fillYearlyPlanStep(page: Page) {
  await fillPersonalInfo(page);
  const heading = page.getByRole("heading", { name: /Select Your Plan/i });
  await expect(heading).toBeVisible();
  await page.getByText("yearly", { exact: true }).click();
  const advancedPlan = await page
    .locator("label")
    .filter({ hasText: "advanced plan120/yr2 months" });
  await expect(advancedPlan).toBeVisible();
  await advancedPlan.click();
  await page.getByRole("button", { name: /Next Step/i }).press("Enter");
  await expect(heading).not.toBeVisible();
}

export async function proceedWithoutAddOns(page: Page) {
  await fillMonthlyPlanStep(page);
  const heading = page.getByRole("heading", { name: /Pick Add-ons/i });
  await expect(heading).toBeVisible();
  await page.getByRole("button", { name: /Next Step/i }).click();
  await expect(heading).not.toBeVisible();
}

export async function pickTwoAddOns(page: Page) {
  await fillMonthlyPlanStep(page);
  const addOn1 = page.locator("label").filter({ hasText: /Online service/i });
  const addOn2 = page.locator("label").filter({ hasText: /Larger storage/i });
  await addOn1.click();
  await addOn2.click();
  await page.getByRole("button", { name: /Next Step/i }).click();
  await expect(
    page.getByRole("heading", { name: /Finishing Up/i }),
  ).toBeVisible();
}
