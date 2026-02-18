import { expect, Locator, Page } from "@playwright/test";

export async function onLoadFocus(page: Page, selector: string): Promise<Locator> {
  const locator = page.locator(selector);
  await locator.focus();
  await expect(locator).toBeFocused();
  return locator;
}

export async function onTabNavigate(page: Page, selector: string): Promise<Locator> {
  await page.keyboard.press("Tab");
  const locator = page.locator(selector);
  await expect(locator).toBeFocused();
  return locator;
}

export async function onTabFill(page: Page, selector: string, value: string): Promise<Locator> {
  const locator = await onLoadFocus(page, selector);
  await locator.fill(value);
  return locator;
}

export async function onFocusFill(page: Page, selector: string, value: string): Promise<Locator> {
  const locator = page.locator(selector);
  await locator.fill(value);
  return locator;
}

export async function onTabCheck(page: Page, selector: string): Promise<Locator> {
  const locator = await onLoadFocus(page, selector);
  await page.keyboard.press("Space");
  return locator;
}

export async function isAutoFocused(page: Page, selector: string, waitTime = 100): Promise<void> {
  await page.waitForTimeout(waitTime);
  const locator = page.locator(selector);
  await expect(locator).toBeFocused();
}

export async function isFocused(page: Page, selector: string): Promise<void> {
  const locator = page.locator(selector);
  await expect(locator).toBeFocused();
}

export async function isChecked(page: Page, selector: string): Promise<void> {
  const locator = page.locator(selector);
  await expect(locator).toBeChecked();
}

export async function isNotChecked(page: Page, selector: string): Promise<void> {
  const locator = page.locator(selector);
  await expect(locator).not.toBeChecked();
}
