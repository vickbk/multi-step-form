import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export async function onLoadFocus(
  page: Page,
  selector: string,
): Promise<Locator> {
  const locator = page.locator(selector);
  await expect(locator).toBeFocused();
  return locator;
}

export async function onTabNavigate(
  page: Page,
  selector: string,
): Promise<Locator> {
  await page.keyboard.press("Tab");
  const locator = page.locator(selector);
  await expect(locator).toBeFocused();
  return locator;
}

export async function onTabFill(
  page: Page,
  selector: string,
  value: string,
): Promise<Locator> {
  const locator = await onTabNavigate(page, selector);
  await locator.fill(value);
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

export async function onTabCheck(
  page: Page,
  selector: string,
): Promise<Locator> {
  const locator = await onTabNavigate(page, selector);
  await page.keyboard.press("Space");
  return locator;
}

export async function isAutoFocused(
  page: Page,
  selector: string,
  waitTime = 100,
): Promise<Locator> {
  const locator = page.locator(selector);
  // Use Playwright's auto-waiting instead of a hard timeout; wait up to `waitTime` for focus.
  await expect(locator).toBeFocused({ timeout: waitTime });
  return locator;
}

export async function isFocused(
  page: Page,
  selector: string,
): Promise<Locator> {
  const locator = page.locator(selector);
  await expect(locator).toBeFocused();
  return locator;
}

export async function isChecked(
  page: Page,
  selector: string,
): Promise<Locator> {
  const locator = page.locator(selector);
  await expect(locator).toBeChecked();
  return locator;
}

export async function isNotChecked(
  page: Page,
  selector: string,
): Promise<Locator> {
  const locator = page.locator(selector);
  await expect(locator).not.toBeChecked();
  return locator;
}
