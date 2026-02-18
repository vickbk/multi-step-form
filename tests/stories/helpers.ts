import { expect, Locator, Page } from "@playwright/test";
import { GO_BACK_BUTTON, NEXT_BUTTON } from "./constant-helpers";
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

export async function clickButton(page: Page, hasText: TEXT_PATTERN) {
  await page.locator("button", { hasText }).click();
}

export async function clickNextButton(page: Page) {
  await clickButton(page, NEXT_BUTTON);
}

export async function clickBackButton(page: Page) {
  await clickButton(page, GO_BACK_BUTTON);
}

export async function navigateToStep(page: Page, stepNumber: number) {
  await clickButton(page, stepNumber.toString());
}

export async function clickLabelInput(page: Page, labelText: TEXT_PATTERN) {
  const label = page.locator("label").filter({ hasText: labelText });
  await label.click();
}

export async function clickMultipleLabelInputs(
  page: Page,
  labelTexts: TEXT_PATTERN[],
) {
  for (const labelText of labelTexts) {
    await clickLabelInput(page, labelText);
  }
}

/**
 * Generates an input selector string based on name, type, and value attributes.
 * Uses array syntax to support trailing commas for optional parameters.
 * 
 * @param params - Array of [name, type, value] where all parameters are optional
 * @returns A CSS selector string for the input element
 * 
 * @example
 * inputTemp(['name']) // 'input[name="name"]'
 * inputTemp([, 'radio', 'arcade']) // 'input[type="radio"][value="arcade"]'
 * inputTemp([, 'checkbox', 'online-service']) // 'input[type="checkbox"][value="online-service"]'
 */
export function inputTemp([name, type, value]: [string?, string?, string?] = []): string {
  const parts: string[] = ['input'];
  
  if (name) parts.push(`[name="${name}"]`);
  if (type) parts.push(`[type="${type}"]`);
  if (value) parts.push(`[value="${value}"]`);
  
  return parts.join('');
}
