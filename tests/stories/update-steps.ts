import { expect, Page } from "@playwright/test";
import { pickTwoAddOns } from "./fill-steps";

export async function updatePersonalInfo(
  page: Page,
  {
    name = "updated name",
    email = "updated@email.com",
    phone = "01234567890",
  } = {},
) {
  await pickTwoAddOns(page);
  const step1 = page.getByRole("button", { name: /Change/i }).first();
  await step1.click();
  await expect(
    page.getByRole("heading", { name: /Personal Info/i }),
  ).toBeVisible();
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

  await expect(
    page.getByRole("heading", { name: /Select Your Plan/i }),
  ).toBeVisible();

  const step4 = page.getByRole("button", { name: /4/i });
  await step4.click();
  await expect(
    page.getByRole("heading", { name: /Finishing Up/i }),
  ).toBeVisible();
}
