import { test } from "@playwright/test";
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
    await shouldSee(page, [
      /Finishing Up/i,
      /John Doe/i,
      /john.doe@email.com/i,
      /01234567890/i,
    ]);
  });

  test("should update plan selection and reflect the change on summary page", async ({
    page,
  }) => {
    await updatePlan(page, { billing: /monthly/i, plan: /arcade/i });
    await shouldSee(page, [/Finishing Up/i, /Arcade \(per month\)/i]);

    await updatePlan(page, { billing: /yearly/i, plan: /advanced/i });
    await shouldSee(page, [/Finishing Up/i, /Advanced \(per year\)/i]);
  });

  test("should update add-ons and reflect the change on summary section", async ({
    page,
  }) => {
    const addOns = [
      /online service/i,
      /larger storage/i,
      /customizable profile/i,
    ];
    await updateAddOns(page, addOns);
    await shouldSee(page, [/Finishing Up/i, ...addOns]);

    const customizableProfile = /customizable profile/i;
    await updateAddOns(page, [customizableProfile]);
    await shouldSee(page, [/Finishing Up/i, customizableProfile]);
  });
});
