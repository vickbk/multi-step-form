import { render, screen } from "@testing-library/react";
import App from "./App";

describe("MultiStep form Tests", () => {
  test("should have one level 1 heading", async () => {
    render(<App />);
    const headers = await screen.findAllByRole("heading", { level: 1 });
    expect(headers).toHaveLength(1);
  });
});
