import { FormSteps } from "@/features/sidebar/components/form-steps";
import { SideBar } from "@/features/sidebar/components/sidebar";
import { Article } from "@/shared/heading-manager/components/heading-managers";
import { useState } from "react";
import { FieldSection } from "./fields-section";
import { NavigationBar } from "./navigation-bar";

export const MultiStepForm = () => {
  const [step, setStep] = useState(3);
  return (
    <Article className="flex flex-col justify-between min-h-screen tracking-normal">
      <SideBar>
        <FormSteps step={step} />
      </SideBar>
      <FieldSection step={step} />
      <NavigationBar {...{ step, setStep }} />
    </Article>
  );
};
