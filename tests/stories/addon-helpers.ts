import { expect, Page } from "@playwright/test";
import { inputTemp } from "./helpers";

export async function expectCheckboxesChecked(
  page: Page,
  checkboxValues: string[],
) {
  for (const value of checkboxValues) {
    const checkbox = page.locator(inputTemp([, 'checkbox', value]));
    await expect(checkbox).toBeChecked();
  }
}

export async function expectCheckboxesUnchecked(
  page: Page,
  checkboxValues: string[],
) {
  for (const value of checkboxValues) {
    const checkbox = page.locator(inputTemp([, 'checkbox', value]));
    await expect(checkbox).not.toBeChecked();
  }
}

export async function expectRadiosChecked(
  page: Page,
  radioValues: string[],
) {
  for (const value of radioValues) {
    const radio = page.locator(inputTemp([, 'radio', value]));
    await expect(radio).toBeChecked();
  }
}

export async function expectRadiosUnchecked(
  page: Page,
  radioValues: string[],
) {
  for (const value of radioValues) {
    const radio = page.locator(inputTemp([, 'radio', value]));
    await expect(radio).not.toBeChecked();
  }
}

export async function expectInputsChecked(
  page: Page,
  inputType: "checkbox" | "radio",
  values: string[],
) {
  for (const value of values) {
    const input = page.locator(inputTemp([, inputType, value]));
    await expect(input).toBeChecked();
  }
}

export async function expectInputsUnchecked(
  page: Page,
  inputType: "checkbox" | "radio",
  values: string[],
) {
  for (const value of values) {
    const input = page.locator(inputTemp([, inputType, value]));
    await expect(input).not.toBeChecked();
  }
}
