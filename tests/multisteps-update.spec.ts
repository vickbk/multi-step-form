import { expect, test } from "@playwright/test";
import { updatePersonalInfo } from "./stories";

test.describe("Multi-step form - update", () => {
  test("should update the plan selection and reflect the changes in the summary step", async ({
    page,
  }) => {
    await updatePersonalInfo(page, {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "01234567890",
    });
    await expect(page.getByText(/John Doe/i)).toBeVisible();
    await expect(page.getByText(/john.doe@email.com/i)).toBeVisible();
    await expect(page.getByText(/01234567890/i)).toBeVisible();
  });
});
