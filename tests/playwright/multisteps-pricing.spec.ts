import { expect, test } from "@playwright/test";
import {
  ADVANCED_SELECTOR,
  ARCADE_SELECTOR,
  clickBackButton,
  clickLabelInput,
  clickNextButton,
  CUSTOMIZABLE_PROFILE,
  fillPersonalInfo,
  FINISHING_UP_HEADING,
  LARGER_STORAGE,
  ONLINE_SERVICE,
  pickAddOns,
  PRO_SELECTOR,
  SELECT_PLAN_HEADING,
  shouldSee,
  YEARLY_SELECTOR,
} from ".";

test.describe("Multi-step form - pricing", () => {
  test("should calculate total price correctly - monthly arcade + online service", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    await clickLabelInput(page, ARCADE_SELECTOR);
    await clickNextButton(page);

    await clickLabelInput(page, ONLINE_SERVICE);
    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, /\$10\/mo/i]);
  });

  test("should calculate total price correctly - yearly advanced + all addons", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    await clickLabelInput(page, YEARLY_SELECTOR);

    await clickLabelInput(page, ADVANCED_SELECTOR);
    await clickNextButton(page);

    await clickLabelInput(page, ONLINE_SERVICE);
    await clickLabelInput(page, LARGER_STORAGE);
    await clickLabelInput(page, CUSTOMIZABLE_PROFILE);
    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, /\$170\/yr/i]);
  });

  test("should calculate total price correctly - monthly pro + larger storage", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    await clickLabelInput(page, PRO_SELECTOR);
    await clickNextButton(page);

    await clickLabelInput(page, LARGER_STORAGE);
    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, /\$17\/mo/i]);
  });

  test("should update plan prices when switching billing period", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await clickLabelInput(page, ARCADE_SELECTOR);

    await clickLabelInput(page, YEARLY_SELECTOR);

    await shouldSee(page, [[/\/yr/, 0]]);
  });

  test("should update add-on prices when switching billing period", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    await clickLabelInput(page, ARCADE_SELECTOR);
    await clickNextButton(page);

    await shouldSee(page, [[/\+1\/mo/i, 0], [/\+2\/mo/i, 0]]);

    await clickBackButton(page);
    await clickLabelInput(page, YEARLY_SELECTOR);
    await clickNextButton(page);

    await shouldSee(page, [[/\+10\/yr/i, 0], [/\+20\/yr/i, 0]]);
  });

  test("should be able to change plan from summary page", async ({ page }) => {
    await pickAddOns(page);
    await shouldSee(page, [FINISHING_UP_HEADING]);

    // Verify we're on the summary and at least one "Change" button exists
    const changeButtons = page.getByRole("button", { name: /change/i });
    const count = await changeButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should show correct total with no add-ons selected", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    await clickLabelInput(page, YEARLY_SELECTOR);
    await clickLabelInput(page, PRO_SELECTOR);
    await clickNextButton(page);

    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, [/\$150\/yr/i, 1]]);
  });
});
