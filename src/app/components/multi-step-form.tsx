import { FormSteps } from "@/features/sidebar/components/form-steps";
import { SideBar } from "@/features/sidebar/components/sidebar";
import { Article } from "@/shared/heading-manager/components/heading-managers";
import { useSteps } from "../hooks/use-steps";
import { FieldSection } from "./fields-section";
import { NavigationBar } from "./navigation-bar";

export const MultiStepForm = () => {
  const stepController = useSteps();
  return (
    <Article className="flex flex-col justify-between min-h-screen tracking-normal">
      <SideBar>
        <FormSteps {...stepController} />
      </SideBar>
      <FieldSection {...stepController} />
      <NavigationBar {...stepController} />
    </Article>
  );
};
