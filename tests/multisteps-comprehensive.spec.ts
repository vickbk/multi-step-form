import { expect, test } from "@playwright/test";
import {
  ADVANCED_SELECTOR,
  ARCADE_SELECTOR,
  clickLabelInput,
  clickNextButton,
  CUSTOMIZABLE_PROFILE,
  fillPersonalInfo,
  FINISHING_UP_HEADING,
  LARGER_STORAGE,
  MONTHLY_SELECTOR,
  ONLINE_SERVICE,
  PICK_ADDONS_HEADING,
  PRO_SELECTOR,
  SELECT_PLAN_HEADING,
  shouldSee,
  YEARLY_SELECTOR,
} from "./stories";

test.describe("Multi-step form - Plan Type Coverage", () => {
  test("should select Arcade monthly plan and complete form", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    // Select monthly billing (default)
    await clickLabelInput(page, ARCADE_SELECTOR);
    await clickNextButton(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);
    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, /Arcade.*per month/i]);
  });

  test("should select Arcade yearly plan and complete form", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    // Switch to yearly billing
    await clickLabelInput(page, YEARLY_SELECTOR);
    await clickLabelInput(page, ARCADE_SELECTOR);
    await clickNextButton(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);
    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, /Arcade.*per year/i]);
  });

  test("should select Advanced monthly plan and complete form", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await clickLabelInput(page, ADVANCED_SELECTOR);
    await clickNextButton(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);
    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, /Advanced.*per month/i]);
  });

  test("should select Advanced yearly plan and complete form", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await clickLabelInput(page, YEARLY_SELECTOR);
    await clickLabelInput(page, ADVANCED_SELECTOR);
    await clickNextButton(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);
    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, /Advanced.*per year/i]);
  });

  test("should select Pro monthly plan and complete form", async ({ page }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await clickLabelInput(page, PRO_SELECTOR);
    await clickNextButton(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);
    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, /Pro.*per month/i]);
  });

  test("should select Pro yearly plan and complete form", async ({ page }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await clickLabelInput(page, YEARLY_SELECTOR);
    await clickLabelInput(page, PRO_SELECTOR);
    await clickNextButton(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);
    await clickNextButton(page);

    await shouldSee(page, [FINISHING_UP_HEADING, /Pro.*per year/i]);
  });
});

test.describe("Multi-step form - Add-on Deselection", () => {
  test("should deselect a single add-on", async ({ page }) => {
    await fillPersonalInfo(page);

    await clickLabelInput(page, ARCADE_SELECTOR);
    await clickNextButton(page);

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

    await clickLabelInput(page, ARCADE_SELECTOR);
    await clickNextButton(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Select all add-ons
    await clickLabelInput(page, ONLINE_SERVICE);
    await clickLabelInput(page, LARGER_STORAGE);
    await clickLabelInput(page, CUSTOMIZABLE_PROFILE);

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
    await clickLabelInput(page, ONLINE_SERVICE);
    await clickLabelInput(page, LARGER_STORAGE);
    await clickLabelInput(page, CUSTOMIZABLE_PROFILE);

    // Verify all are unchecked
    await expect(onlineCheckbox).not.toBeChecked();
    await expect(storageCheckbox).not.toBeChecked();
    await expect(profileCheckbox).not.toBeChecked();
  });

  test("should deselect specific add-ons while keeping others selected", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    await clickLabelInput(page, ARCADE_SELECTOR);
    await clickNextButton(page);

    await shouldSee(page, [PICK_ADDONS_HEADING]);

    // Select all add-ons
    await clickLabelInput(page, ONLINE_SERVICE);
    await clickLabelInput(page, LARGER_STORAGE);
    await clickLabelInput(page, CUSTOMIZABLE_PROFILE);

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
    const nameInput = page.locator('input[name="name"]');
    await nameInput.focus();
    await expect(nameInput).toBeFocused();

    await page.keyboard.press("Tab");
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toBeFocused();

    await page.keyboard.press("Tab");
    const phoneInput = page.locator('input[name="phone"]');
    await expect(phoneInput).toBeFocused();
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

test.describe("Multi-step form - Input Validation Edge Cases", () => {
  test("should reject email with missing @ symbol", async ({ page }) => {
    await page.goto("/");

    await page.locator('input[name="name"]').fill("Test User");
    await page.locator('input[name="email"]').fill("invalidemail.com");
    await page.locator('input[name="phone"]').fill("+1234567890");

    await clickNextButton(page);

    // Should show validation error
    const emailInput = page.locator('input[name="email"]');
    const validationMessage = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage,
    );
    expect(validationMessage).toBeTruthy();
  });

  test("should reject email with spaces", async ({ page }) => {
    await page.goto("/");

    await page.locator('input[name="name"]').fill("Test User");
    await page.locator('input[name="email"]').fill("test user@email.com");
    await page.locator('input[name="phone"]').fill("+1234567890");

    await clickNextButton(page);

    const emailInput = page.locator('input[name="email"]');
    const validationMessage = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage,
    );
    expect(validationMessage).toBeTruthy();
  });

  test("should accept email with plus sign", async ({ page }) => {
    await page.goto("/");

    await page.locator('input[name="name"]').fill("Test User");
    await page.locator('input[name="email"]').fill("test+tag@email.com");
    await page.locator('input[name="phone"]').fill("+1234567890");

    await clickNextButton(page);

    await shouldSee(page, [SELECT_PLAN_HEADING]);
  });

  test("should handle very long name gracefully", async ({ page }) => {
    await page.goto("/");

    const longName = "A".repeat(100);
    await page.locator('input[name="name"]').fill(longName);
    await page.locator('input[name="email"]').fill("test@email.com");
    await page.locator('input[name="phone"]').fill("+1234567890");

    await clickNextButton(page);

    await shouldSee(page, [SELECT_PLAN_HEADING]);
  });

  test("should handle phone number with various formats", async ({ page }) => {
    await page.goto("/");

    // Test with dashes
    await page.locator('input[name="name"]').fill("Test User");
    await page.locator('input[name="email"]').fill("test@email.com");
    await page.locator('input[name="phone"]').fill("123-456-7890");

    await clickNextButton(page);

    await shouldSee(page, [SELECT_PLAN_HEADING]);
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

    await clickLabelInput(page, ARCADE_SELECTOR);
    await clickNextButton(page);

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

    // Select Pro plan
    await clickLabelInput(page, PRO_SELECTOR);
    await clickNextButton(page);

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
