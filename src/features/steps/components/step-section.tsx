import {
  Heading,
  Legend,
} from "@/shared/heading-manager/components/heading-managers";
import { joinClasses } from "@/shared/libs";
import { forwardRef } from "react";

export const StepSection = forwardRef<
  HTMLFieldSetElement,
  {
    header: Record<"title" | "description", string>;
    children: React.ReactNode;
  }
>(({ header: { title, description }, children }, ref) => {
  return (
    <fieldset className={joinClasses(["grid gap-4"])} ref={ref}>
      <Legend className="mb-4 md:mb-8">
        <Heading className="text-4xl font-bold">{title}</Heading>
        <span className="text-xl c-grey-500 mt-4 block">{description}</span>
      </Legend>
      {children}
    </fieldset>
  );
});

StepSection.displayName = "StepSection";
