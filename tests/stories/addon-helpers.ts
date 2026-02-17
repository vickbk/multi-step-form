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
