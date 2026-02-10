import { AddsOn } from "@/features/steps/components/adds-on";
import { FinalStep } from "@/features/steps/components/final-step";
import { PersonalInfo } from "@/features/steps/components/personal-info";
import { PlanSection } from "@/features/steps/components/plan-section";
import { Summary } from "@/features/steps/components/summary";
import { NavigationBar } from "./navigation-bar";

export const FieldSection = () => {
  return (
    <div>
      <PersonalInfo />
      <AddsOn />
      <PlanSection />
      <Summary />
      <NavigationBar />
      <FinalStep />
    </div>
  );
};
