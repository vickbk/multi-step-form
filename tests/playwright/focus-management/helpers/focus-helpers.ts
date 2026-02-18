import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export async function isFocused(
  page: Page,
  selector: string,
): Promise<Locator> {
  const locator = page.locator(selector);
  await expect(locator).toBeFocused();
  return locator;
}

export async function onFocusFill(
  page: Page,
  selector: string,
  value: string,
): Promise<Locator> {
  const locator = page.locator(selector);
  await locator.focus();
  await locator.fill(value);
  return locator;
}

export async function onMultipleFocusFill(
  page: Page,
  fields: Array<[string, string]>,
): Promise<void> {
  for (const [selector, value] of fields) {
    await onFocusFill(page, selector, value);
  }
}
