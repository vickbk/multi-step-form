import { StepHeader } from "./step-header";

export const StepSection = ({
  header,
  children,
}: {
  header: Record<"title" | "description", string>;
  children: React.ReactNode;
}) => {
  return (
    <fieldset>
      <StepHeader {...header} />
      {children}
    </fieldset>
  );
};
