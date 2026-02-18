import type { Page } from "@playwright/test";
import {
  clickMultipleLabelInputs,
  shouldNotSee,
  shouldSee,
} from "@tests/playwright/shared";
import {
  FINISHING_UP_HEADING,
  LARGER_STORAGE,
  NO_ADDONS_SELECTED,
  ONLINE_SERVICE,
  PICK_ADDONS_HEADING,
} from "@tests/shared";
import { clickNextButton } from "../../navigation";
import { fillMonthlyPlanStep } from "../../plan-coverage";

export async function proceedWithoutAddOns(page: Page) {
  await fillMonthlyPlanStep(page);

  await shouldSee(page, [PICK_ADDONS_HEADING]);

  await clickNextButton(page);
  await shouldNotSee(page, [PICK_ADDONS_HEADING]);
  await shouldSee(page, [FINISHING_UP_HEADING, NO_ADDONS_SELECTED]);
}

export async function pickAddOns(
  page: Page,
  addOns = [ONLINE_SERVICE, LARGER_STORAGE],
) {
  await fillMonthlyPlanStep(page);

  await clickMultipleLabelInputs(page, addOns);

  await clickNextButton(page);
  await shouldSee(page, [FINISHING_UP_HEADING, ...addOns]);
}
