import { expect, Locator, Page } from "@playwright/test";
import { LABEL_LOCATOR, TEXT_MATCHER, TEXT_PATTERN } from "./types";

export async function shouldSee(page: Page, textes: TEXT_MATCHER[]) {
  for (const text of textes) {
    if (Array.isArray(text)) {
      const [matcher, nth] = text;
      await expect(page.getByText(matcher).nth(nth)).toBeVisible();
    } else {
      await expect(page.getByText(text)).toBeVisible();
    }
  }
}

export async function shouldNotSee(page: Page, textes: TEXT_MATCHER[]) {
  for (const text of textes) {
    if (Array.isArray(text)) {
      const [matcher, nth] = text;
      await expect(page.getByText(matcher).nth(nth)).not.toBeVisible();
    } else {
      await expect(page.getByText(text)).not.toBeVisible();
    }
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

export async function clickBackButton(page: Page) {
  await page.getByRole("button", { name: /go back/i }).click();
}

export async function navigateToStep(page: Page, stepNumber: number) {
  await page.getByRole("button", { name: stepNumber.toString() }).click();
}

export async function clickLabelInput(page: Page, labelText: TEXT_PATTERN) {
  const label = page.locator("label").filter({ hasText: labelText });
  await label.click();
}

export async function clickMultipleLabelInputs(page: Page, labelTexts: TEXT_PATTERN[]) {
  for (const labelText of labelTexts) {
    await clickLabelInput(page, labelText);
  }
}
