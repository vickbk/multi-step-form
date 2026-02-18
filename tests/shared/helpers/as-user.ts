import { Page } from "@playwright/test";

export async function asUser(page: Page) {
  return await page.goto("/");
}
