import { FormSteps } from "@/features/sidebar/components/form-steps";
import { SideBar } from "@/features/sidebar/components/sidebar";
import { useSteps } from "../hooks/use-steps";
import "../styles/multi-step-form.css";
import { FieldSection } from "./fields-section";
import { NavigationBar } from "./navigation-bar";

export const MultiStepForm = () => {
  const stepController = useSteps();
  return (
    <form className="multi-step-form">
      <SideBar>
        <FormSteps {...stepController} />
      </SideBar>
      <FieldSection {...stepController} />
      {stepController.step <= 3 && <NavigationBar {...stepController} />}
    </form>
  );
};
