import { Page } from "@playwright/test";
import { asUser } from "./as-user";
import { fillLocatorWith, shouldSee } from "./helpers";

export async function seePersonalInfoErrors(page: Page) {
  await asUser(page);
  await page.locator("button", { hasText: /Next/i }).click();
  await shouldSee(page, [
    /Personal Info/i,
    /This field is required/i,
    /Please enter a valid email/i,
    /Please enter a valid phone number/i,
  ]);
}

export async function seeEmailError(page: Page) {
  await seePersonalInfoErrors(page);
  await fillLocatorWith(
    page.locator("label", { hasText: /Name/i }),
    "Test User",
  );
  await fillLocatorWith(
    page.locator("label", { hasText: /Phone Number/i }),
    "1234567890",
  );
  await page.locator("button", { hasText: /Next/i }).click();
  await shouldSee(page, [/Personal Info/i, /Please enter a valid email/i]);

  await fillLocatorWith(
    page.locator("label", { hasText: /Email Address/i }),
    "invalid-email",
  );
  await page.locator("button", { hasText: /Next/i }).click();
  await shouldSee(page, [/Personal Info/i, /Please enter a valid email/i]);
}
