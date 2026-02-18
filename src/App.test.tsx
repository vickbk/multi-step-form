import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  EMAIL_INPUT,
  INVALID_EMAIL,
  INVALID_EMAIL_ERROR,
  INVALID_PHONE,
  INVALID_PHONE_ERROR,
  INVALID_SPACED_EMAIL,
  NAME_INPUT,
  NEXT_BUTTON,
  PHONE_INPUT,
  REQUIRED_FIELD_ERROR,
  SELECT_PLAN_HEADING,
  TEST_EMAIL,
  TEST_NAME,
  TEST_PHONE,
  VALID_PHONES,
  VALID_PLUS_EMAIL,
} from "@tests/stories";
import App from "./App";
import { checkHeadingOrder } from "./shared/heading-manager/library/check-heading-order";
import { drawRegion } from "./shared/heading-manager/library/region-drawer";
import { getRandomElement } from "./shared/libs";

type FormFieldTuple = [selector: string, value: string];

async function fillForm(
  container: HTMLElement,
  fields: FormFieldTuple[],
  submit = false,
) {
  for (const [selector, value] of fields) {
    const input = container.querySelector(selector) as HTMLInputElement;

    await userEvent.type(input, value);
  }

  if (submit) {
    const nextButton = await screen.findByRole("button", {
      name: NEXT_BUTTON,
    });
    await userEvent.click(nextButton);
  }
}

describe("MultiStep form Tests", () => {
  test("should have one level 1 heading", async () => {
    render(<App />);
    const headers = await screen.findAllByRole("heading", { level: 1 });
    expect(headers).toHaveLength(1);
  });

  test("all headings should respect heading order", () => {
    const { container } = render(<App />);
    expect(checkHeadingOrder(drawRegion(container))).toBeTruthy();
  });

  test("should have a form element", async () => {
    render(<App />);
    const form = await screen.findByRole("form");
    expect(form).toBeInTheDocument();
  });

  test.each([2, 3, 4])(
    "should not navigate to step %i when the corresponding step button is clicked if no data is processed",
    async (step) => {
      render(<App />);
      await screen.findByText(/personal info/i);
      const stepButton = await screen.findByRole("button", {
        name: new RegExp(step.toString()),
      });
      await userEvent.click(stepButton);
      await screen.findByText(/personal info/i);
    },
  );

  test("should show error messages if navigating to step 2 without valid data", async () => {
    render(<App />);
    const nextButton = await screen.findByRole("button", {
      name: NEXT_BUTTON,
    });
    await userEvent.click(nextButton);
    const errorsSelectors = [
      REQUIRED_FIELD_ERROR,
      INVALID_EMAIL_ERROR,
      INVALID_PHONE_ERROR,
    ]
      .map(({ source }) => source)
      .join("|");
    expect(
      (await screen.findAllByText(new RegExp(errorsSelectors, "i"))).length,
    ).toBe(3);
  });
});

describe("MultiStep form - Input Validation", () => {
  test("should reject email with missing @ symbol", async () => {
    const { container } = render(<App />);

    await fillForm(
      container,
      [
        [NAME_INPUT, TEST_NAME],
        [EMAIL_INPUT, INVALID_EMAIL],
        [PHONE_INPUT, INVALID_PHONE],
      ],
      true,
    );

    const emailInput = container.querySelector(
      'input[name="email"]',
    ) as HTMLInputElement;
    expect(emailInput?.validationMessage).toBeTruthy();
  });

  test("should reject email with spaces", async () => {
    const { container } = render(<App />);

    await fillForm(
      container,
      [
        [NAME_INPUT, TEST_NAME],
        [EMAIL_INPUT, INVALID_SPACED_EMAIL],
        [PHONE_INPUT, TEST_PHONE],
      ],
      true,
    );

    const emailInput = container.querySelector(EMAIL_INPUT) as HTMLInputElement;
    expect(emailInput?.validationMessage).toBeTruthy();
  });

  test("should accept email with plus sign", async () => {
    const { container } = render(<App />);

    await fillForm(
      container,
      [
        [NAME_INPUT, TEST_NAME],
        [EMAIL_INPUT, VALID_PLUS_EMAIL],
        [PHONE_INPUT, TEST_PHONE],
      ],
      true,
    );

    await screen.findByText(SELECT_PLAN_HEADING);
  });

  test("should handle very long name gracefully", async () => {
    const { container } = render(<App />);

    const longName = "A".repeat(100);
    await fillForm(
      container,
      [
        [NAME_INPUT, longName],
        [EMAIL_INPUT, TEST_EMAIL],
        [PHONE_INPUT, TEST_PHONE],
      ],
      true,
    );

    await screen.findByText(SELECT_PLAN_HEADING);
  });

  test("should handle phone number with various formats", async () => {
    const { container } = render(<App />);

    await fillForm(
      container,
      [
        [NAME_INPUT, TEST_NAME],
        [EMAIL_INPUT, TEST_EMAIL],
        [PHONE_INPUT, getRandomElement(VALID_PHONES)],
      ],
      true,
    );

    await screen.findByText(SELECT_PLAN_HEADING);
  });
});
