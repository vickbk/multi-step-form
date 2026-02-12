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
    <fieldset className={joinClasses([!show && "hidden"])}>
      <legend>
        <Heading>{title}</Heading>
        <p>{description}</p>
      </legend>
      {children}
    </fieldset>
  );
};
