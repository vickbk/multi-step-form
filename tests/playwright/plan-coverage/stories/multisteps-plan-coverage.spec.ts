import { test } from "@playwright/test";
import { clickNextButton } from "@tests/playwright/form";
import {
  ADVANCED_PLAN_MONTHLY,
  ADVANCED_PLAN_YEARLY,
  ARCADE_PLAN_MONTHLY,
  ARCADE_PLAN_YEARLY,
  FINISHING_UP_HEADING,
  PRO_PLAN_MONTHLY,
  PRO_PLAN_YEARLY,
  selectAdvancedMonthly,
  selectAdvancedYearly,
  selectArcadeMonthly,
  selectArcadeYearly,
  selectProMonthly,
  selectProYearly,
  shouldSee,
} from "@tests/playwright/shared";

test.describe("Multi-step form - Plan Type Coverage", () => {
  test("should select Arcade monthly plan and complete form", async ({
    page,
  }) => {
    await selectArcadeMonthly(page);

    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, ARCADE_PLAN_MONTHLY]);
  });

  test("should select Arcade yearly plan and complete form", async ({
    page,
  }) => {
    await selectArcadeYearly(page);

    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, ARCADE_PLAN_YEARLY]);
  });

  test("should select Advanced monthly plan and complete form", async ({
    page,
  }) => {
    await selectAdvancedMonthly(page);

    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, ADVANCED_PLAN_MONTHLY]);
  });

  test("should select Advanced yearly plan and complete form", async ({
    page,
  }) => {
    await selectAdvancedYearly(page);

    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, ADVANCED_PLAN_YEARLY]);
  });

  test("should select Pro monthly plan and complete form", async ({ page }) => {
    await selectProMonthly(page);

    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, PRO_PLAN_MONTHLY]);
  });

  test("should select Pro yearly plan and complete form", async ({ page }) => {
    await selectProYearly(page);

    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, PRO_PLAN_YEARLY]);
  });
});
