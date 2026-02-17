import { test } from "@playwright/test";
import {
  clickLabelInput,
  clickMultipleLabelInputs,
  CUSTOMIZABLE_PROFILE,
  expectCheckboxesChecked,
  expectCheckboxesUnchecked,
  isChecked,
  isNotChecked,
  LARGER_STORAGE,
  ONLINE_SERVICE,
  selectArcadeMonthly,
} from "./stories";

test.describe("Multi-step form - Add-on Deselection", () => {
  test("should deselect a single add-on", async ({ page }) => {
    await selectArcadeMonthly(page);

    await clickLabelInput(page, ONLINE_SERVICE);
    await isChecked(page, 'input[type="checkbox"][value="online-service"]');

    await clickLabelInput(page, ONLINE_SERVICE);
    await isNotChecked(page, 'input[type="checkbox"][value="online-service"]');
  });

  test("should deselect all add-ons after selecting them", async ({ page }) => {
    await selectArcadeMonthly(page);

    const addOns = [ONLINE_SERVICE, LARGER_STORAGE, CUSTOMIZABLE_PROFILE];

    await clickMultipleLabelInputs(page, addOns);

    await expectCheckboxesChecked(page, [
      "online-service",
      "larger-storage",
      "customizable-profile",
    ]);

    await clickMultipleLabelInputs(page, addOns);

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

    await clickMultipleLabelInputs(page, [
      ONLINE_SERVICE,
      LARGER_STORAGE,
      CUSTOMIZABLE_PROFILE,
    ]);

    await clickLabelInput(page, LARGER_STORAGE);

    await expectCheckboxesChecked(page, [
      "online-service",
      "customizable-profile",
    ]);
    await expectCheckboxesUnchecked(page, ["larger-storage"]);
  });
});
