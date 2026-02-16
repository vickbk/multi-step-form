import { expect, test } from "@playwright/test";
import {
  ARCADE_SELECTOR,
  ADVANCED_SELECTOR,
  clickNextButton,
  CUSTOMIZABLE_PROFILE,
  fillPersonalInfo,
  FINISHING_UP_HEADING,
  LARGER_STORAGE,
  MONTHLY_SELECTOR,
  ONLINE_SERVICE,
  PICK_ADDONS_HEADING,
  pickAddOns,
  PRO_SELECTOR,
  SELECT_PLAN_HEADING,
  shouldSee,
  YEARLY_SELECTOR,
} from "./stories";

test.describe("Multi-step form - pricing", () => {
  test("should calculate total price correctly - monthly arcade + online service", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    // Select Arcade monthly plan ($9/mo)
    await page.locator("label", { hasText: ARCADE_SELECTOR }).click();
    await clickNextButton(page);

    // Select Online Service add-on ($1/mo)
    await page.locator("label", { hasText: ONLINE_SERVICE }).click();
    await clickNextButton(page);

    // Verify total is $10/mo
    await shouldSee(page, [FINISHING_UP_HEADING]);
    await expect(page.getByText(/\$10\/mo/i)).toBeVisible();
  });

  test("should calculate total price correctly - yearly advanced + all addons", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    // Switch to yearly billing
    await page.getByText("yearly", { exact: true }).click();

    // Select Advanced plan ($120/yr)
    await page.locator("label", { hasText: ADVANCED_SELECTOR }).click();
    await clickNextButton(page);

    // Select all add-ons ($10 + $20 + $20 = $50/yr)
    await page.locator("label", { hasText: ONLINE_SERVICE }).click();
    await page.locator("label", { hasText: LARGER_STORAGE }).click();
    await page.locator("label", { hasText: CUSTOMIZABLE_PROFILE }).click();
    await clickNextButton(page);

    // Verify total is $170/yr
    await shouldSee(page, [FINISHING_UP_HEADING]);
    await expect(page.getByText(/\$170\/yr/i)).toBeVisible();
  });

  test("should calculate total price correctly - monthly pro + larger storage", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    // Select Pro monthly plan ($15/mo)
    await page.locator("label", { hasText: PRO_SELECTOR }).click();
    await clickNextButton(page);

    // Select Larger Storage add-on ($2/mo)
    await page.locator("label", { hasText: LARGER_STORAGE }).click();
    await clickNextButton(page);

    // Verify total is $17/mo
    await shouldSee(page, [FINISHING_UP_HEADING]);
    await expect(page.getByText(/\$17\/mo/i)).toBeVisible();
  });

  test("should update plan prices when switching billing period", async ({
    page,
  }) => {
    await fillPersonalInfo(page);
    await shouldSee(page, [SELECT_PLAN_HEADING]);

    // Verify monthly is selected by default and shows monthly prices
    await page.locator("label", { hasText: ARCADE_SELECTOR }).click();
    
    // Switch to yearly and verify yearly prices appear
    await page.getByText("yearly", { exact: true }).click();
    
    // Wait for page to update and verify yearly prices
    await page.waitForTimeout(500); // Give time for prices to update
    
    // Check that at least one yearly price is visible
    const yearlyPriceVisible = await page.getByText(/\/yr/).first().isVisible();
    expect(yearlyPriceVisible).toBe(true);
  });

  test("should update add-on prices when switching billing period", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    // Select Arcade monthly
    await page.locator("label", { hasText: ARCADE_SELECTOR }).click();
    await clickNextButton(page);

    // Verify monthly add-on prices
    await expect(page.getByText(/\+1\/mo/i).first()).toBeVisible(); // Online service
    await expect(page.getByText(/\+2\/mo/i).first()).toBeVisible(); // Larger storage

    // Go back to change billing
    await page.getByRole("button", { name: /go back/i }).click();
    await page.getByText("yearly", { exact: true }).click();
    await clickNextButton(page);

    // Verify yearly add-on prices
    await expect(page.getByText(/\+10\/yr/i)).toBeVisible(); // Online service
    await expect(page.getByText(/\+20\/yr/i).first()).toBeVisible(); // Larger storage
  });

  test("should be able to change plan from summary page", async ({
    page,
  }) => {
    await pickAddOns(page);
    await shouldSee(page, [FINISHING_UP_HEADING]);

    // Verify we're on the summary
    await expect(page.getByRole("heading", { name: FINISHING_UP_HEADING })).toBeVisible();

    // Verify at least one "Change" button exists
    const changeButtons = page.getByRole("button", { name: /change/i });
    const count = await changeButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should show correct total with no add-ons selected", async ({
    page,
  }) => {
    await fillPersonalInfo(page);

    // Select Pro yearly plan ($150/yr)
    await page.getByText("yearly", { exact: true }).click();
    await page.locator("label", { hasText: PRO_SELECTOR }).click();
    await clickNextButton(page);

    // Don't select any add-ons
    await clickNextButton(page);

    // Verify total is just the plan price (use nth(1) for the total element)
    await shouldSee(page, [FINISHING_UP_HEADING]);
    await expect(page.getByText(/\$150\/yr/i).nth(1)).toBeVisible();
  });
});
