import { test } from "@playwright/test";
import {
  ARCADE_SELECTOR,
  clickLabelInput,
  clickNextButton,
  fillPersonalInfo,
  isAutoFocused,
  isChecked,
  isNotChecked,
  onLoadFocus,
  onTabNavigate,
  PICK_ADDONS_HEADING,
  SELECT_PLAN_HEADING,
  shouldSee,
} from "./stories";

test.describe("Multi-step form - Keyboard Navigation", () => {
  test("should navigate through form using Tab key", async ({ page }) => {
    await page.goto("/");

    await onLoadFocus(page, 'input[name="name"]');

    await onTabNavigate(page, 'input[name="email"]');

    await onTabNavigate(page, 'input[name="phone"]');
  });

  test("should select plan using keyboard", async ({ page }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await isAutoFocused(page, 'input[type="radio"][value="arcade"]');

    await page.keyboard.press("Space");
    await isChecked(page, 'input[type="radio"][value="arcade"]');

    await page.keyboard.press("ArrowDown");
    await isChecked(page, 'input[type="radio"][value="advanced"]');

    await page.keyboard.press("ArrowDown");
    await isChecked(page, 'input[type="radio"][value="pro"]');
  });

  test("should toggle add-ons using Space key", async ({ page }) => {
    await fillPersonalInfo(page);

    await clickLabelInput(page, ARCADE_SELECTOR);
    await clickNextButton(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);

    const onlineCheckbox = page.locator(
      'input[type="checkbox"][value="online-service"]',
    );
    await onlineCheckbox.focus();

    await page.keyboard.press("Space");
    await isChecked(page, 'input[type="checkbox"][value="online-service"]');

    await page.keyboard.press("Space");
    await isNotChecked(page, 'input[type="checkbox"][value="online-service"]');
  });

  test("should submit step using Enter key on Next button", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await clickLabelInput(page, ARCADE_SELECTOR);

    const nextButton = page.locator("button", { hasText: /Next/i });
    await nextButton.focus();
    await page.keyboard.press("Enter");

    await shouldSee(page, [PICK_ADDONS_HEADING]);
  });
});
