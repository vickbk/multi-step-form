import { expect, test } from "@playwright/test";
import {
  ARCADE_SELECTOR,
  clickLabelInput,
  clickNextButton,
  fillPersonalInfo,
  INFO_TITLE,
  onLoadFocus,
  onTabNavigate,
  PICK_ADDONS_HEADING,
  SELECT_PLAN_HEADING,
  shouldSee,
} from "./stories";

test.describe("Multi-step form - Keyboard Navigation", () => {
  test("should navigate through form using Tab key", async ({ page }) => {
    await page.goto("/");

    // Focus the name input first
    await onLoadFocus(page, 'input[name="name"]');

    await onTabNavigate(page, 'input[name="email"]');

    await onTabNavigate(page, 'input[name="phone"]');
  });

  test("should select plan using keyboard", async ({ page }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    // Tab to first plan option (should be focused by default)
    const arcadeRadio = page.locator('input[type="radio"][value="arcade"]');
    await arcadeRadio.focus();

    // Use Space to select
    await page.keyboard.press("Space");
    await expect(arcadeRadio).toBeChecked();

    // Arrow down to next option
    await page.keyboard.press("ArrowDown");
    const advancedRadio = page.locator('input[type="radio"][value="advanced"]');
    await expect(advancedRadio).toBeChecked();

    // Arrow down to next option
    await page.keyboard.press("ArrowDown");
    const proRadio = page.locator('input[type="radio"][value="pro"]');
    await expect(proRadio).toBeChecked();
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

    // Toggle with Space
    await page.keyboard.press("Space");
    await expect(onlineCheckbox).toBeChecked();

    // Toggle again to uncheck
    await page.keyboard.press("Space");
    await expect(onlineCheckbox).not.toBeChecked();
  });

  test("should submit step using Enter key on Next button", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await clickLabelInput(page, ARCADE_SELECTOR);

    // Focus Next button and press Enter
    const nextButton = page.locator("button", { hasText: /Next/i });
    await nextButton.focus();
    await page.keyboard.press("Enter");

    await shouldSee(page, [PICK_ADDONS_HEADING]);
  });

  test("should navigate back using Escape key", async ({ page }) => {
    // This test should fail as the feature is not yet implemented
    test.fail(true, "Escape key navigation not yet implemented");

    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await clickLabelInput(page, ARCADE_SELECTOR);
    await clickNextButton(page);
    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Try to navigate back with Escape key
    await page.keyboard.press("Escape");

    // When implemented, this should navigate back to SELECT_PLAN_HEADING
    await shouldSee(page, [SELECT_PLAN_HEADING]);
  });
});
