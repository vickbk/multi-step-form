import type { Page } from "@playwright/test";
import { clickButton } from "@tests/playwright/shared";
import { GO_BACK_BUTTON, NEXT_BUTTON } from "@tests/shared";

export async function clickNextButton(page: Page) {
  await clickButton(page, NEXT_BUTTON);
}

export async function clickBackButton(page: Page) {
  await clickButton(page, GO_BACK_BUTTON);
}

export async function navigateToStep(page: Page, stepNumber: number) {
  await clickButton(page, stepNumber.toString());
}
