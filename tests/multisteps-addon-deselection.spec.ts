import { expect, test } from "@playwright/test";
import {
  clickLabelInput,
  clickMultipleLabelInputs,
  CUSTOMIZABLE_PROFILE,
  expectCheckboxesChecked,
  expectCheckboxesUnchecked,
  LARGER_STORAGE,
  ONLINE_SERVICE,
  selectArcadeMonthly,
} from "./stories";

test.describe("Multi-step form - Add-on Deselection", () => {
  test("should deselect a single add-on", async ({ page }) => {
    await selectArcadeMonthly(page);

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
    await selectArcadeMonthly(page);

    const addOns = [ONLINE_SERVICE, LARGER_STORAGE, CUSTOMIZABLE_PROFILE];

    // Select all add-ons
    await clickMultipleLabelInputs(page, addOns);

    // Verify all are checked
    await expectCheckboxesChecked(page, [
      "online-service",
      "larger-storage",
      "customizable-profile",
    ]);

    // Deselect all add-ons
    await clickMultipleLabelInputs(page, addOns);

    // Verify all are unchecked
    await expectCheckboxesUnchecked(page, [
      "online-service",
      "larger-storage",
      "customizable-profile",
    ]);
  });

  test("should deselect specific add-ons while keeping others selected", async ({
    page,
  }) => {
    await selectArcadeMonthly(page);

    // Select all add-ons
    await clickMultipleLabelInputs(page, [
      ONLINE_SERVICE,
      LARGER_STORAGE,
      CUSTOMIZABLE_PROFILE,
    ]);

    // Deselect only the middle one
    await clickLabelInput(page, LARGER_STORAGE);

    // Verify correct states
    await expectCheckboxesChecked(page, [
      "online-service",
      "customizable-profile",
    ]);
    await expectCheckboxesUnchecked(page, ["larger-storage"]);
  });
});
