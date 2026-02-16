import { expect, Locator, Page } from "@playwright/test";
import { LABEL_LOCATOR } from "./types";

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

export async function setLocatorValue(
  page: Page,
  [locator, value]: LABEL_LOCATOR,
) {
  const element = page.locator("label", { hasText: locator });
  await element.click();
  await element.fill(value);
}

export async function setValueForLocators(
  page: Page,
  locatorsAndValues: LABEL_LOCATOR[],
) {
  for (const locatorAndValue of locatorsAndValues) {
    await setLocatorValue(page, locatorAndValue);
  }
}

export async function clickNextButton(page: Page) {
  await page.locator("button", { hasText: /Next/i }).click();
}
