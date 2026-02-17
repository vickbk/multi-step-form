import { expect, test } from "@playwright/test";
import {
  ADVANCED_PLAN_MONTHLY,
  ADVANCED_PLAN_YEARLY,
  ADVANCED_SELECTOR,
  ARCADE_PLAN_MONTHLY,
  ARCADE_PLAN_YEARLY,
  ARCADE_SELECTOR,
  clickLabelInput,
  clickMultipleLabelInputs,
  clickNextButton,
  CUSTOMIZABLE_PROFILE,
  fillPersonalInfo,
  FINISHING_UP_HEADING,
  LARGER_STORAGE,
  MONTHLY_SELECTOR,
  onTabFocus,
  onTabNavigate,
  ONLINE_SERVICE,
  PICK_ADDONS_HEADING,
  PRO_PLAN_MONTHLY,
  PRO_PLAN_YEARLY,
  PRO_SELECTOR,
  selectAdvancedMonthly,
  selectAdvancedYearly,
  selectArcadeMonthly,
  selectArcadeYearly,
  selectPlan,
  selectProMonthly,
  selectProYearly,
  SELECT_PLAN_HEADING,
  shouldSee,
  YEARLY_SELECTOR,
} from "./stories";

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

test.describe("Multi-step form - Add-on Deselection", () => {
  test("should deselect a single add-on", async ({ page }) => {
    await fillPersonalInfo(page);

    await selectArcadeMonthly(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Select an add-on
    await clickLabelInput(page, ONLINE_SERVICE);
    const onlineCheckbox = page.locator(
      'input[type="checkbox"][value="online-service"]',
    );
    await expect(onlineCheckbox).toBeChecked();

    // Deselect the add-on
    await clickLabelInput(page, ONLINE_SERVICE);
    await expect(onlineCheckbox).not.toBeChecked();
  });

  test("should deselect all add-ons after selecting them", async ({ page }) => {
    await fillPersonalInfo(page);

    await selectArcadeMonthly(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Select all add-ons
    await clickMultipleLabelInputs(page, [
      ONLINE_SERVICE,
      LARGER_STORAGE,
      CUSTOMIZABLE_PROFILE,
    ]);

    // Verify all are checked
    const onlineCheckbox = page.locator(
      'input[type="checkbox"][value="online-service"]',
    );
    const storageCheckbox = page.locator(
      'input[type="checkbox"][value="larger-storage"]',
    );
    const profileCheckbox = page.locator(
      'input[type="checkbox"][value="customizable-profile"]',
    );

    await expect(onlineCheckbox).toBeChecked();
    await expect(storageCheckbox).toBeChecked();
    await expect(profileCheckbox).toBeChecked();

    // Deselect all add-ons
    await clickMultipleLabelInputs(page, [
      ONLINE_SERVICE,
      LARGER_STORAGE,
      CUSTOMIZABLE_PROFILE,
    ]);

    // Verify all are unchecked
    await expect(onlineCheckbox).not.toBeChecked();
    await expect(storageCheckbox).not.toBeChecked();
    await expect(profileCheckbox).not.toBeChecked();
  });

  test("should deselect specific add-ons while keeping others selected", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    await selectArcadeMonthly(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Select all add-ons
    await clickMultipleLabelInputs(page, [
      ONLINE_SERVICE,
      LARGER_STORAGE,
      CUSTOMIZABLE_PROFILE,
    ]);

    // Deselect only the middle one
    await clickLabelInput(page, LARGER_STORAGE);

    const onlineCheckbox = page.locator(
      'input[type="checkbox"][value="online-service"]',
    );
    const storageCheckbox = page.locator(
      'input[type="checkbox"][value="larger-storage"]',
    );
    const profileCheckbox = page.locator(
      'input[type="checkbox"][value="customizable-profile"]',
    );

    await expect(onlineCheckbox).toBeChecked();
    await expect(storageCheckbox).not.toBeChecked();
    await expect(profileCheckbox).toBeChecked();
  });
});

test.describe("Multi-step form - Keyboard Navigation", () => {
  test("should navigate through form using Tab key", async ({ page }) => {
    await page.goto("/");

    // Focus the name input first
    await onTabFocus(page, 'input[name="name"]');

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
});

test.describe("Multi-step form - Focus Management", () => {
  test("should focus first input on page load", async ({ page }) => {
    await page.goto("/");

    // Wait a bit for autofocus to take effect
    await page.waitForTimeout(100);

    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toBeFocused();
  });

  test("should focus first plan option when navigating to plan step", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    // Wait a bit for autofocus to take effect
    await page.waitForTimeout(100);

    const arcadeRadio = page.locator('input[type="radio"][value="arcade"]');
    await expect(arcadeRadio).toBeFocused();
  });

  test("should focus first add-on when navigating to add-ons step", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    await selectArcadeMonthly(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Wait a bit for autofocus to take effect
    await page.waitForTimeout(100);

    const onlineCheckbox = page.locator(
      'input[type="checkbox"][value="online-service"]',
    );
    await expect(onlineCheckbox).toBeFocused();
  });

  test("should maintain focus on selected plan when switching billing period", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    // Select a plan
    await clickLabelInput(page, ADVANCED_SELECTOR);
    const advancedRadio = page.locator('input[type="radio"][value="advanced"]');
    await expect(advancedRadio).toBeChecked();

    // Switch billing period
    await clickLabelInput(page, YEARLY_SELECTOR);

    // Advanced should still be selected after switching billing period
    await expect(advancedRadio).toBeChecked();

    // Verify the billing period changed
    const yearlyRadio = page.locator('input[type="radio"][value="yearly"]');
    await expect(yearlyRadio).toBeChecked();
  });

  test("should restore focus to previously selected plan when navigating back", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    // Select Pro plan using helper
    await selectPlan(page, PRO_SELECTOR, MONTHLY_SELECTOR);

    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Navigate back
    const backButton = page.getByRole("button", { name: /go back/i });
    await backButton.click();

    await shouldSee(page, [SELECT_PLAN_HEADING]);

    // Wait a bit for autofocus to take effect
    await page.waitForTimeout(100);

    // Pro should still be selected and focused
    const proRadio = page.locator('input[type="radio"][value="pro"]');
    await expect(proRadio).toBeChecked();
    await expect(proRadio).toBeFocused();
  });

  test("should trap focus within error messages when validation fails", async ({
    page,
  }) => {
    await page.goto("/");

    // Try to submit without filling required fields
    await clickNextButton(page);

    // Name input should receive focus
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toBeFocused();
  });
});
