import { expect, Page } from "@playwright/test";

type CheckboxState = {
  selector: string;
  value: string;
};

export async function getCheckedCheckboxes(
  page: Page,
  checkboxes: CheckboxState[],
) {
  const locators = checkboxes.map(({ selector, value }) => ({
    locator: page.locator(`input[type="checkbox"][value="${value}"]`),
    selector,
    value,
  }));

  return locators;
}

export async function expectCheckboxesChecked(
  page: Page,
  checkboxValues: string[],
) {
  for (const value of checkboxValues) {
    const checkbox = page.locator(`input[type="checkbox"][value="${value}"]`);
    await expect(checkbox).toBeChecked();
  }
}

export async function expectCheckboxesUnchecked(
  page: Page,
  checkboxValues: string[],
) {
  for (const value of checkboxValues) {
    const checkbox = page.locator(`input[type="checkbox"][value="${value}"]`);
    await expect(checkbox).not.toBeChecked();
  }
}

export async function expectRadiosChecked(
  page: Page,
  radioValues: string[],
) {
  for (const value of radioValues) {
    const radio = page.locator(`input[type="radio"][value="${value}"]`);
    await expect(radio).toBeChecked();
  }
}

export async function expectRadiosUnchecked(
  page: Page,
  radioValues: string[],
) {
  for (const value of radioValues) {
    const radio = page.locator(`input[type="radio"][value="${value}"]`);
    await expect(radio).not.toBeChecked();
  }
}

export async function expectInputsChecked(
  page: Page,
  inputType: "checkbox" | "radio",
  values: string[],
) {
  for (const value of values) {
    const input = page.locator(`input[type="${inputType}"][value="${value}"]`);
    await expect(input).toBeChecked();
  }
}

export async function expectInputsUnchecked(
  page: Page,
  inputType: "checkbox" | "radio",
  values: string[],
) {
  for (const value of values) {
    const input = page.locator(`input[type="${inputType}"][value="${value}"]`);
    await expect(input).not.toBeChecked();
  }
}
