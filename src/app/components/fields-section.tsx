import { AddsOn } from "@/features/steps/adds-on/components/adds-on";
import { FinalStep } from "@/features/steps/components/final-step";
import { PersonalInfo } from "@/features/steps/personel-info/components/personal-info";
import { PlanSection } from "@/features/steps/plan-step/components/plan-section";
import { Summary } from "@/features/steps/summary.tsx/summary";
import { NavigationBar } from "./navigation-bar";

export const FieldSection = () => {
  return (
    <>
      <div className="mx-4 mb-6 p-8 white rounded-2xl">
        <PersonalInfo />
        <PlanSection />
        <AddsOn />
        <Summary />
        <FinalStep />
      </div>

      <NavigationBar />
    </>
  );
};
