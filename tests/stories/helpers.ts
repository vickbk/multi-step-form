import { expect, Locator, Page } from "@playwright/test";

export async function shouldSee(page: Page, textes: (string | RegExp)[]) {
  for (const text of textes) {
    await expect(page.getByText(text)).toBeVisible();
  }
}

export async function shouldNotSee(page: Page, textes: (string | RegExp)[]) {
  for (const text of textes) {
    await expect(page.getByText(text)).not.toBeVisible();
  }
}

export async function fillLocatorWith(locator: Locator, value: string) {
  await locator.click();
  await locator.fill(value);
}

export async function clickNextButton(page: Page) {
  await page.locator("button", { hasText: /Next/i }).click();
}
