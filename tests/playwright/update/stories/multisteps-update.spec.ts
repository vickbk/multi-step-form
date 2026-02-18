import { test } from "@playwright/test";
import {
  ADVANCED_PLAN_YEARLY,
  ADVANCED_SELECTOR,
  ARCADE_PLAN_MONTHLY,
  ARCADE_SELECTOR,
  CUSTOMIZABLE_PROFILE,
  FINISHING_UP_HEADING,
  JOHN_DOE,
  JOHN_DOE_EMAIL,
  JOHN_DOE_PHONE,
  LARGER_STORAGE,
  MONTHLY_SELECTOR,
  ONLINE_SERVICE,
  shouldSee,
  updateAddOns,
  updatePersonalInfo,
  updatePlan,
  YEARLY_SELECTOR,
} from "@tests/playwright/shared";

test.describe("Multi-step form - update", () => {
  test("should update the personal information and reflect the changes in the summary step", async ({
    page,
  }) => {
    await updatePersonalInfo(page, {
      name: JOHN_DOE,
      email: JOHN_DOE_EMAIL,
      phone: JOHN_DOE_PHONE,
    });
    await shouldSee(page, [
      FINISHING_UP_HEADING,
      JOHN_DOE,
      JOHN_DOE_EMAIL,
      JOHN_DOE_PHONE,
    ]);
  });

  test("should update plan selection and reflect the change on summary page", async ({
    page,
  }) => {
    await updatePlan(page, {
      billing: MONTHLY_SELECTOR,
      plan: ARCADE_SELECTOR,
    });
    await shouldSee(page, [FINISHING_UP_HEADING, ARCADE_PLAN_MONTHLY]);

    await updatePlan(page, {
      billing: YEARLY_SELECTOR,
      plan: ADVANCED_SELECTOR,
    });
    await shouldSee(page, [FINISHING_UP_HEADING, ADVANCED_PLAN_YEARLY]);
  });

  test("should update add-ons and reflect the change on summary section", async ({
    page,
  }) => {
    const addOns = [ONLINE_SERVICE, LARGER_STORAGE, CUSTOMIZABLE_PROFILE];
    await updateAddOns(page, addOns);
    await shouldSee(page, [FINISHING_UP_HEADING, ...addOns]);

    await updateAddOns(page, [CUSTOMIZABLE_PROFILE]);
    await shouldSee(page, [FINISHING_UP_HEADING, CUSTOMIZABLE_PROFILE]);
  });
});
