import { expect, test } from "@playwright/test";
import {
  clickLabelInput,
  clickMultipleLabelInputs,
  CUSTOMIZABLE_PROFILE,
  fillPersonalInfo,
  LARGER_STORAGE,
  ONLINE_SERVICE,
  PICK_ADDONS_HEADING,
  selectArcadeMonthly,
  shouldSee,
} from "./stories";

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
