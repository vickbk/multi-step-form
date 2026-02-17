import { expect, Locator, Page } from "@playwright/test";

export async function onTabFocus(page: Page, selector: string): Promise<Locator> {
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
  const locator = await onTabFocus(page, selector);
  await locator.fill(value);
  return locator;
}

export async function onTabCheck(page: Page, selector: string): Promise<Locator> {
  const locator = await onTabFocus(page, selector);
  await page.keyboard.press("Space");
  return locator;
}
