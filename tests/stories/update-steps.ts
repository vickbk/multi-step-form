import { Page } from "@playwright/test";
import { clickOnAddOn, pickAddOns } from "./fill-steps";
import { shouldSee } from "./helpers";

export async function updatePersonalInfo(
  page: Page,
  {
    name = "updated name",
    email = "updated@email.com",
    phone = "01234567890",
  } = {},
) {
  await pickAddOns(page);

  await clickChangeButton(page, "personal info");
  await shouldSee(page, [/Personal Info/i]);

  const nameInput = page.getByRole("textbox", { name: /Name/i });
  await nameInput.click();
  await nameInput.fill(name);

  const emailInput = page.getByRole("textbox", { name: /Email/i });
  await emailInput.click();
  await emailInput.fill(email);

  const phoneInput = page.getByRole("textbox", { name: /Phone/i });
  await phoneInput.click();
  await phoneInput.fill(phone);

  await phoneInput.press("Enter");

  await shouldSee(page, [/Select Your Plan/i]);

  const step4 = page.getByRole("button", { name: /4/i });
  await step4.click();
  await shouldSee(page, [/Finishing Up/i]);
}

export async function updatePlan(
  page: Page,
  { billing = /monthly/i, plan = /pro/i } = {},
) {
  await pickAddOns(page);
  await shouldSee(page, [/Arcade/i]);

  await clickChangeButton(page, "plan");
  await shouldSee(page, [/Select Your Plan/i]);

  await page.locator("label", { hasText: plan }).click();
  await page.locator("label", { hasText: billing }).click();

  const step4 = page.getByRole("button", { name: /4/i });

  await step4.click();
  await shouldSee(page, [/Finishing Up/i]);
}

export async function updateAddOns(
  page: Page,
  addOns = [/online service/i, /larger storage/i, /customizable profile/i],
) {
  const initialAddOns = [/Online Service/i, /Larger Storage/i];
  await pickAddOns(page, initialAddOns);
  await shouldSee(page, initialAddOns);

  await clickChangeButton(page, "add-ons");

  await shouldSee(page, [/Pick Add-ons/i]);

  for (const addOn of initialAddOns) {
    await clickOnAddOn(page, addOn);
  }

  for (const addOn of addOns) {
    await clickOnAddOn(page, addOn);
  }
  await page.getByRole("button", { name: /Next Step/i }).click();

  await shouldSee(page, [/Finishing Up/i, ...addOns]);
}

async function clickChangeButton(
  page: Page,
  step: "personal info" | "plan" | "add-ons" | number,
) {
  const stepIndex =
    typeof step === "number"
      ? step
      : { "personal info": 0, plan: 1, "add-ons": 2 }[step];
  return page
    .getByRole("button", { name: /Change/i })
    .nth(stepIndex)
    .click();
}
