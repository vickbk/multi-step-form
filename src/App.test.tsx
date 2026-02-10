import { render, screen } from "@testing-library/react";
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
});
