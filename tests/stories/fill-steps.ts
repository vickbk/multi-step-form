import { Page } from "@playwright/test";
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

  await fillLocatorWith(page.locator("label", { hasText: /Name/i }), TEST_NAME);

  await fillLocatorWith(
    page.locator("label", { hasText: /Email Address/i }),
    TEST_EMAIL,
  );

  await fillLocatorWith(
    page.locator("label", { hasText: /Phone Number/i }),
    TEST_PHONE,
  );

  await clickNextButton(page);
  await shouldSee(page, [/Select Your Plan/i]);
}

export async function fillMonthlyPlanStep(page: Page) {
  await fillPersonalInfo(page);
  await shouldSee(page, [/Select Your Plan/i]);

  const arcadePlan = page.locator("label", { hasText: /arcade plan/i });
  await arcadePlan.click();
  await clickNextButton(page);
  await shouldSee(page, [/Pick Add-ons/i]);
}

export async function seeErrorMessageOnPlanSelection(page: Page) {
  await fillPersonalInfo(page);
  await shouldSee(page, [/Select Your Plan/i]);
  await clickNextButton(page);
  await shouldSee(page, [/Please choose your plan/i]);
}

export async function fillYearlyPlanStep(page: Page) {
  await fillPersonalInfo(page);
  const planHeading = /select your plan/i;
  await shouldSee(page, [planHeading]);
  await page.getByText("yearly", { exact: true }).click();
  const advancedPlan = page.locator("label", {
    hasText: /advanced plan120\/yr2 months/i,
  });
  await advancedPlan.click();
  await clickNextButton(page);
  await shouldNotSee(page, [planHeading]);
}

export async function proceedWithoutAddOns(page: Page) {
  await fillMonthlyPlanStep(page);

  const addOnsHeading = /pick add-ons/i;
  await shouldSee(page, [addOnsHeading]);

  await clickNextButton(page);
  await shouldNotSee(page, [addOnsHeading]);
  await shouldSee(page, [/Finishing Up/i, /no add-ons selected/i]);
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
  await shouldSee(page, [/Finishing Up/i]);
}

export async function clickOnAddOn(page: Page, addOn: RegExp | string) {
  const addOnOption = page.locator("label").filter({ hasText: addOn });
  await shouldSee(page, [addOn]);
  await addOnOption.click();
}
