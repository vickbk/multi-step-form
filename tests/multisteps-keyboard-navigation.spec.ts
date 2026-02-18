import { test } from "@playwright/test";
import {
  ADVANCED_RADIO_INPUT,
  ARCADE_RADIO_INPUT,
  ARCADE_SELECTOR,
  clickLabelInput,
  EMAIL_INPUT,
  isAutoFocused,
  isChecked,
  isNotChecked,
  NAME_INPUT,
  NEXT_BUTTON,
  onLoadFocus,
  onTabNavigate,
  ONLINE_SERVICE_CHECKBOX,
  PHONE_INPUT,
  PICK_ADDONS_HEADING,
  PRO_RADIO_INPUT,
  SELECT_PLAN_HEADING,
  shouldSee,
} from "./stories";

test.describe("Multi-step form - Keyboard Navigation", () => {
  test("should navigate through form using Tab key", async ({ page }) => {
    await page.goto("/");

    await onLoadFocus(page, NAME_INPUT);

    await onTabNavigate(page, EMAIL_INPUT);

    await onTabNavigate(page, PHONE_INPUT);
  });

  test("should select plan using keyboard", async ({ page }) => {
    await page.goto("/");
    
    const nameInput = page.locator(NAME_INPUT);
    await nameInput.fill("Test User");
    
    const emailInput = page.locator(EMAIL_INPUT);
    await emailInput.fill("test@example.com");
    
    const phoneInput = page.locator(PHONE_INPUT);
    await phoneInput.fill("1234567890");
    
    const nextButton = page.getByRole("button", { name: NEXT_BUTTON });
    await nextButton.click();
    
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await isAutoFocused(page, ARCADE_RADIO_INPUT);

    await page.keyboard.press("Space");
    await isChecked(page, ARCADE_RADIO_INPUT);

    await page.keyboard.press("ArrowDown");
    await isChecked(page, ADVANCED_RADIO_INPUT);

    await page.keyboard.press("ArrowDown");
    await isChecked(page, PRO_RADIO_INPUT);
  });

  test("should toggle add-ons using Space key", async ({ page }) => {
    await page.goto("/");
    
    const nameInput = page.locator(NAME_INPUT);
    await nameInput.fill("Test User");
    
    const emailInput = page.locator(EMAIL_INPUT);
    await emailInput.fill("test@example.com");
    
    const phoneInput = page.locator(PHONE_INPUT);
    await phoneInput.fill("1234567890");
    
    const nextButton1 = page.getByRole("button", { name: NEXT_BUTTON });
    await nextButton1.click();

    await clickLabelInput(page, ARCADE_SELECTOR);
    
    const nextButton2 = page.getByRole("button", { name: NEXT_BUTTON });
    await nextButton2.click();

    await shouldSee(page, [PICK_ADDONS_HEADING]);

    const onlineCheckbox = page.locator(ONLINE_SERVICE_CHECKBOX);
    await onlineCheckbox.focus();

    await page.keyboard.press("Space");
    await isChecked(page, ONLINE_SERVICE_CHECKBOX);

    await page.keyboard.press("Space");
    await isNotChecked(page, ONLINE_SERVICE_CHECKBOX);
  });

  test("should submit step using Enter key on Next button", async ({
    page,
  }) => {
    await page.goto("/");
    
    const nameInput = page.locator(NAME_INPUT);
    await nameInput.fill("Test User");
    
    const emailInput = page.locator(EMAIL_INPUT);
    await emailInput.fill("test@example.com");
    
    const phoneInput = page.locator(PHONE_INPUT);
    await phoneInput.fill("1234567890");
    
    const nextButton1 = page.getByRole("button", { name: NEXT_BUTTON });
    await nextButton1.click();
    
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await clickLabelInput(page, ARCADE_SELECTOR);

    const nextButton = page.getByRole("button", { name: NEXT_BUTTON });
    await nextButton.focus();
    await page.keyboard.press("Enter");

    await shouldSee(page, [PICK_ADDONS_HEADING]);
  });
});
