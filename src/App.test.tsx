import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { checkHeadingOrder } from "./shared/heading-manager/library/check-heading-order";
import { drawRegion } from "./shared/heading-manager/library/region-drawer";

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
      name: /next step/i,
    });
    await userEvent.click(nextButton);
    expect(
      (
        await screen.findAllByText(
          /(This field is required)|(Please enter a valid phone number)|(Please enter a valid email address)/i,
        )
      ).length,
    ).toBe(3);
  });
});

describe("MultiStep form - Input Validation", () => {
  test("should reject email with missing @ symbol", async () => {
    const { container } = render(<App />);
    const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
    const phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement;

    await userEvent.type(nameInput, "Test User");
    await userEvent.type(emailInput, "invalidemail.com");
    await userEvent.type(phoneInput, "+1234567890");

    const nextButton = await screen.findByRole("button", { name: /next step/i });
    await userEvent.click(nextButton);

    expect(emailInput.validationMessage).toBeTruthy();
  });

  test("should reject email with spaces", async () => {
    const { container } = render(<App />);
    const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
    const phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement;

    await userEvent.type(nameInput, "Test User");
    await userEvent.type(emailInput, "test user@email.com");
    await userEvent.type(phoneInput, "+1234567890");

    const nextButton = await screen.findByRole("button", { name: /next step/i });
    await userEvent.click(nextButton);

    expect(emailInput.validationMessage).toBeTruthy();
  });

  test("should accept email with plus sign", async () => {
    const { container } = render(<App />);
    const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
    const phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement;

    await userEvent.type(nameInput, "Test User");
    await userEvent.type(emailInput, "test+tag@email.com");
    await userEvent.type(phoneInput, "+1234567890");

    const nextButton = await screen.findByRole("button", { name: /next step/i });
    await userEvent.click(nextButton);

    await screen.findByText(/select your plan/i);
  });

  test("should handle very long name gracefully", async () => {
    const { container } = render(<App />);
    const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
    const phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement;

    const longName = "A".repeat(100);
    await userEvent.type(nameInput, longName);
    await userEvent.type(emailInput, "test@email.com");
    await userEvent.type(phoneInput, "+1234567890");

    const nextButton = await screen.findByRole("button", { name: /next step/i });
    await userEvent.click(nextButton);

    await screen.findByText(/select your plan/i);
  });

  test("should handle phone number with various formats", async () => {
    const { container } = render(<App />);
    const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
    const phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement;

    await userEvent.type(nameInput, "Test User");
    await userEvent.type(emailInput, "test@email.com");
    await userEvent.type(phoneInput, "123-456-7890");

    const nextButton = await screen.findByRole("button", { name: /next step/i });
    await userEvent.click(nextButton);

    await screen.findByText(/select your plan/i);
  });
});
