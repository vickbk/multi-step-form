/**
 * Generates a CSS selector string by combining a base element/tag with attribute selectors.
 *
 * @param template - The base element/tag (e.g., "input", "button").
 * @param objectValues - An object whose keys are attribute names and values are attribute values.
 *   Only attributes with non-empty string values are included.
 * @returns A CSS selector string, e.g., 'input[name="foo"][type="radio"]'
 *
 * @example
 * cssTemplateCreator("input", { name: "foo", type: "radio" }) // 'input[name="foo"][type="radio"]'
 * cssTemplateCreator("button", { type: "submit" }) // 'button[type="submit"]'
 */
export function cssTemplateCreator(
  template: string,
  objectValues: Partial<Record<string, string>>,
): string {
  const options = Object.entries(objectValues)
    .filter(([, value]) => typeof value === "string" && value.length > 0)
    .map(([key, value]) => `[${key}="${value}"]`);
  return `${template}${options.join("")}`;
}

export function isTemplated(value: string): boolean {
  return /\[.*=.*\]/.test(value);
}
/**
 * Generates an input selector string based on name, type, and value attributes.
 * Uses array syntax to support trailing commas for optional parameters.
 *
 * @param params - Array of [name, type, value] where all parameters are optional
 * @returns A CSS selector string for the input element
 *
 * @example
 * inputTemp(['name']) // 'input[name="name"]'
 * inputTemp(['name', 'radio', 'arcade']) // 'input[name="name"][type="radio"][value="arcade"]'
 * inputTemp([undefined, 'checkbox', 'online-service']) // 'input[type="checkbox"][value="online-service"]'
 */

export function inputTemp([name, type, value]: [
  string?,
  string?,
  string?,
] = []): string {
  if (isTemplated(value || "")) {
    return value as string;
  }
  return cssTemplateCreator("input", { name, type, value });
}

export function radioTemp(value: string): string {
  return inputTemp([undefined, "radio", value]);
}

export function checkboxTemp(value: string): string {
  return inputTemp([undefined, "checkbox", value]);
}
