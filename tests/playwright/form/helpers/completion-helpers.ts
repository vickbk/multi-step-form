import type { Page } from "@playwright/test";
import { clickButton, shouldSee } from "@tests/playwright/shared";
import {
  CONFIRM_BUTTON,
  FINISHING_UP_HEADING,
  THANK_YOU_HEADING,
} from "@tests/shared";
import { pickAddOns } from "./fill-steps";

export async function completeFormSubmission(page: Page) {
  await pickAddOns(page);
  await shouldSee(page, [FINISHING_UP_HEADING]);
  await clickButton(page, CONFIRM_BUTTON);
  await shouldSee(page, [THANK_YOU_HEADING]);
}
