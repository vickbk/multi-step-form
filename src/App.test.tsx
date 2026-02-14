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
});
