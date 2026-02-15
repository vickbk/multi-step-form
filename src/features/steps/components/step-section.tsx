import {
  Header,
  Heading,
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
      <legend className="mb-4">
        <Header>
          <Heading className="text-4xl font-bold">{title}</Heading>
          <p className="text-xl c-grey-500 mt-4">{description}</p>
        </Header>
      </legend>
      {children}
    </fieldset>
  );
});

StepSection.displayName = "StepSection";
