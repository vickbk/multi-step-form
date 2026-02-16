import { expect, Page } from "@playwright/test";
import { asUser } from "./as-user";
import {
  clickNextButton,
  fillLocatorWith,
  shouldNotSee,
  shouldSee,
} from "./helpers";

const {
  TEST_NAME = "test",
  TEST_EMAIL = "test@example.com",
  TEST_PHONE = "1234567890",
} = process.env;

export async function fillPersonalInfo(page: Page) {
  await asUser(page);

  const nameInput = page.getByRole("textbox", { name: "Name" });
  await fillLocatorWith(nameInput, TEST_NAME);

  const emailInput = page.getByRole("textbox", { name: "Email Address" });
  await fillLocatorWith(emailInput, "invalid-email");

  const emailErrorMessage = /Please enter a valid email address/i;
  await emailInput.press("Enter");
  await shouldSee(page, [emailErrorMessage]);

  await fillLocatorWith(emailInput, TEST_EMAIL);

  await shouldNotSee(page, [emailErrorMessage]);

  await fillLocatorWith(
    page.getByRole("textbox", { name: "Phone Number" }),
    TEST_PHONE,
  );

  await clickNextButton(page);
  await shouldSee(page, [/Select Your Plan/i]);
}

export async function fillMonthlyPlanStep(page: Page) {
  await fillPersonalInfo(page);
  await expect(
    page.getByRole("heading", { name: /Select Your Plan/i }),
  ).toBeVisible();
  const arcadePlan = page.locator("label").filter({ hasText: /arcade plan/i });
  await arcadePlan.click();
  await clickNextButton(page);
  await expect(
    page.getByRole("heading", { name: /Pick Add-ons/i }),
  ).toBeVisible();
}

export async function seeErrorMessageOnPlanSelection(page: Page) {
  await fillPersonalInfo(page);
  await expect(
    page.getByRole("heading", { name: /Select Your Plan/i }),
  ).toBeVisible();
  await clickNextButton(page);
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
  await clickNextButton(page);
  await expect(heading).not.toBeVisible();
}

export async function proceedWithoutAddOns(page: Page) {
  await fillMonthlyPlanStep(page);
  const heading = page.getByRole("heading", { name: /Pick Add-ons/i });
  await expect(heading).toBeVisible();
  await clickNextButton(page);
  await expect(heading).not.toBeVisible();
}

export async function pickAddOns(
  page: Page,
  addOns = [/online service/i, /larger storage/i],
) {
  await fillMonthlyPlanStep(page);

  for (const addOn of addOns) {
    await clickOnAddOn(page, addOn);
  }

  await clickNextButton(page);
  await expect(
    page.getByRole("heading", { name: /Finishing Up/i }),
  ).toBeVisible();
}

export async function clickOnAddOn(page: Page, addOn: RegExp | string) {
  const addOnOption = page.locator("label").filter({ hasText: addOn });
  await expect(addOnOption).toBeVisible();
  await addOnOption.click();
}
