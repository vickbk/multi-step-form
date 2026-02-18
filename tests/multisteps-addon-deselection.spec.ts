import { test } from "@playwright/test";
import {
  clickLabelInput,
  clickMultipleLabelInputs,
  CUSTOMIZABLE_PROFILE,
  CUSTOMIZABLE_PROFILE_CHECKBOX,
  CUSTOMIZABLE_PROFILE_VALUE,
  expectCheckboxesChecked,
  expectCheckboxesUnchecked,
  isChecked,
  isNotChecked,
  LARGER_STORAGE,
  LARGER_STORAGE_CHECKBOX,
  LARGER_STORAGE_VALUE,
  ONLINE_SERVICE,
  ONLINE_SERVICE_CHECKBOX,
  ONLINE_SERVICE_VALUE,
  selectArcadeMonthly,
} from "./stories";

test.describe("Multi-step form - Add-on Deselection", () => {
  test("should deselect a single add-on", async ({ page }) => {
    await selectArcadeMonthly(page);

    await clickLabelInput(page, ONLINE_SERVICE);
    await isChecked(page, ONLINE_SERVICE_CHECKBOX);

    await clickLabelInput(page, ONLINE_SERVICE);
    await isNotChecked(page, ONLINE_SERVICE_CHECKBOX);
  });

  test("should deselect all add-ons after selecting them", async ({ page }) => {
    await selectArcadeMonthly(page);

    const addOns = [ONLINE_SERVICE, LARGER_STORAGE, CUSTOMIZABLE_PROFILE];

    await clickMultipleLabelInputs(page, addOns);

    await expectCheckboxesChecked(page, [
      ONLINE_SERVICE_VALUE,
      LARGER_STORAGE_VALUE,
      CUSTOMIZABLE_PROFILE_VALUE,
    ]);

    await clickMultipleLabelInputs(page, addOns);

    await expectCheckboxesUnchecked(page, [
      ONLINE_SERVICE_VALUE,
      LARGER_STORAGE_VALUE,
      CUSTOMIZABLE_PROFILE_VALUE,
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
      ONLINE_SERVICE_VALUE,
      CUSTOMIZABLE_PROFILE_VALUE,
    ]);
    await expectCheckboxesUnchecked(page, [LARGER_STORAGE_VALUE]);
  });
});
