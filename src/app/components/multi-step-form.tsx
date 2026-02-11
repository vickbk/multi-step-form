import { SideBar } from "@/features/sidebar/components/sidebar";
import { Article } from "@/shared/heading-manager/components/heading-managers";
import { FieldSection } from "./fields-section";

export const MultiStepForm = () => {
  return (
    <Article>
      <SideBar />
      <FieldSection />
    </Article>
  );
};
