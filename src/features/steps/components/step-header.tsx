import { Heading } from "@/shared/heading-manager/components/heading-managers";

export const StepHeader = ({
  title,
  description,
}: Record<"title" | "description", string>) => {
  return (
    <legend>
      <Heading>{title}</Heading>
      <p>{description}</p>
    </legend>
  );
};
