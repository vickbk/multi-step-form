import { Heading } from "@/shared/heading-manager/components/heading-managers";
import { joinClasses } from "@/shared/libs";

export const StepSection = ({
  header: { title, description },
  children,
  show = false,
}: {
  header: Record<"title" | "description", string>;
  children: React.ReactNode;
  show?: boolean;
}) => {
  return (
    <fieldset className={joinClasses([!show && "hidden", "grid gap-4"])}>
      <legend className="mb-4">
        <Heading className="text-4xl font-bold">{title}</Heading>
        <p className="text-xl c-grey-500 mt-4">{description}</p>
      </legend>
      {children}
    </fieldset>
  );
};
