import { test } from "@playwright/test";
import {
  ADVANCED_RADIO_INPUT,
  ARCADE_RADIO_INPUT,
  ARCADE_SELECTOR,
  clickLabelInput,
  clickNextButton,
  EMAIL_INPUT,
  isAutoFocused,
  isChecked,
  isNotChecked,
  NAME_INPUT,
  NEXT_BUTTON,
  ONLINE_SERVICE_CHECKBOX,
  onLoadFocus,
  onMultipleFocusFill,
  onTabNavigate,
  PHONE_INPUT,
  PICK_ADDONS_HEADING,
  PRO_RADIO_INPUT,
  SELECT_PLAN_HEADING,
  selectArcadeMonthly,
  shouldSee,
  UPDATED_EMAIL,
  UPDATED_NAME,
  UPDATED_PHONE,
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

    await onMultipleFocusFill(page, [
      [NAME_INPUT, UPDATED_NAME],
      [EMAIL_INPUT, UPDATED_EMAIL],
      [PHONE_INPUT, UPDATED_PHONE],
    ]);

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
    await selectArcadeMonthly(page);

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

    await onMultipleFocusFill(page, [
      [NAME_INPUT, UPDATED_NAME],
      [EMAIL_INPUT, UPDATED_EMAIL],
      [PHONE_INPUT, UPDATED_PHONE],
    ]);

    await clickNextButton(page);

    await shouldSee(page, [SELECT_PLAN_HEADING]);

    await clickLabelInput(page, ARCADE_SELECTOR);

    await page.locator("button", { hasText: NEXT_BUTTON }).focus();

    await page.keyboard.press("Enter");

    await shouldSee(page, [PICK_ADDONS_HEADING]);
  });
});
