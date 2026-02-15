import { FormSteps } from "@/features/sidebar/components/form-steps";
import { SideBar } from "@/features/sidebar/components/sidebar";
import { AddsOn } from "@/features/steps/add-ons/components/add-ons";
import { FinalStep } from "@/features/steps/components/final-step";
import { PersonalInfo } from "@/features/steps/personel-info/components/personal-info";
import { PlanSection } from "@/features/steps/plan-step/components/plan-section";
import { Summary } from "@/features/steps/summary/components/summary";
import { useMultistepsForm } from "../hooks/use-multisteps-form";
import { submitMultiStepSample } from "../scripts/multi-step-helpers";
import type { MultiStepData } from "../types/multi-step-data";
import { NavigationBar } from "./navigation-bar";

export const MultiStepForm = () => {
  const navigation = useMultistepsForm<MultiStepData>(
    [PersonalInfo, PlanSection, AddsOn, Summary],
    submitMultiStepSample,
  );
  const { formAction, goTo, back, Current, complete, formData, reset } =
    navigation;

  return (
    <form
      className="multi-step-form"
      action={formAction}
      aria-label="multi step form"
    >
      <SideBar>
        <FormSteps {...navigation} />
      </SideBar>
      <div className="mx-4 mb-auto p-8 white rounded-2xl md:max-w-lg">
        {!complete && <Current {...{ ...formData, goTo, back }} />}
        {complete && <FinalStep reset={reset} />}
      </div>
      {!complete && <NavigationBar {...navigation} />}
    </form>
  );
};
