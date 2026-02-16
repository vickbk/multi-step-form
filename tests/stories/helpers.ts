import { expect, Page } from "@playwright/test";

export async function shouldSee(page: Page, textes: (string | RegExp)[]) {
  for (const text of textes) {
    await expect(page.getByText(text)).toBeVisible();
  }
}
