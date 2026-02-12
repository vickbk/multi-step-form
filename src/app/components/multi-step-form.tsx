import { SideBar } from "@/features/sidebar/components/sidebar";
import { Article } from "@/shared/heading-manager/components/heading-managers";
import { FieldSection } from "./fields-section";

export const MultiStepForm = () => {
  return (
    <Article className="flex flex-col justify-between min-h-screen tracking-normal">
      <SideBar />
      <FieldSection />
    </Article>
  );
};
