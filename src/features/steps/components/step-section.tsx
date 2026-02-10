import { Heading } from "@/shared/heading-manager/components/heading-managers";

export const StepSection = ({
  header: { title, description },
  children,
}: {
  header: Record<"title" | "description", string>;
  children: React.ReactNode;
}) => {
  return (
    <fieldset>
      <legend>
        <Heading>{title}</Heading>
        <p>{description}</p>
      </legend>
      {children}
    </fieldset>
  );
};
