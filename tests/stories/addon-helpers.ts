import { expect, Page } from "@playwright/test";
import { checkboxTemp, inputTemp, radioTemp } from "./templating-helper";

export async function expectInputState(
  page: Page,
  selectors: string[],
  checked = true,
) {
  for (const selector of selectors) {
    const input = page.locator(selector);
    if (checked) {
      await expect(input).toBeChecked();
    } else {
      await expect(input).not.toBeChecked();
    }
  }
}
export async function expectCheckboxesChecked(
  page: Page,
  checkboxValues: string[],
) {
  await expectInputState(page, checkboxValues.map(checkboxTemp));
}

export async function expectCheckboxesUnchecked(
  page: Page,
  checkboxValues: string[],
) {
  await expectInputState(page, checkboxValues.map(checkboxTemp), false);
}

export async function expectRadiosChecked(page: Page, radioValues: string[]) {
  await expectInputState(page, radioValues.map(radioTemp));
}

export async function expectRadiosUnchecked(page: Page, radioValues: string[]) {
  await expectInputState(page, radioValues.map(radioTemp), false);
}

function inputTempWithValue(value: string) {
  return inputTemp([undefined, undefined, value]);
}

export async function expectInputsChecked(page: Page, values: string[]) {
  await expectInputState(page, values.map(inputTempWithValue));
}

export async function expectInputsUnchecked(page: Page, values: string[]) {
  await expectInputState(page, values.map(inputTempWithValue), false);
}
