import { expect, test } from "@playwright/test";
import { updateAddOns, updatePersonalInfo, updatePlan } from "./stories";
import { shouldSee } from "./stories/helpers";

test.describe("Multi-step form - update", () => {
  test("should update the personal information and reflect the changes in the summary step", async ({
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

  test("should update plan selection and reflect the change on summary page", async ({
    page,
  }) => {
    await updatePlan(page, { billing: /monthly/i, plan: /arcade/i });
    await expect(page.getByText(/Arcade \(per month\)/i)).toBeVisible();

    await updatePlan(page, { billing: /yearly/i, plan: /advanced/i });
    await expect(page.getByText(/Advanced \(per year\)/i)).toBeVisible();
  });

  test("should update add-ons and reflect the change on summary section", async ({
    page,
  }) => {
    await updateAddOns(page, [
      /online service/i,
      /larger storage/i,
      /customizable profile/i,
    ]);
    await shouldSee(page, [
      /Finishing Up/i,
      /Online Service/i,
      /Larger Storage/i,
      /Customizable Profile/i,
    ]);

    await updateAddOns(page, [/customizable profile/i]);
    await shouldSee(page, [/Finishing Up/i, /Customizable Profile/i]);
  });
});
