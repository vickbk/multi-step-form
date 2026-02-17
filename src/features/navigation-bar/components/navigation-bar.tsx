import { BackButton } from "./back-button";
import { ConfirmButton } from "./confirm-button";
import { NextButton } from "./next-button";

export const NavigationBar = ({
  isFirstStep,
  isLastStep,
}: {
  isFirstStep: boolean;
  isLastStep: boolean;
}) => {
  return (
    <div className="mt-6 flex p-4 justify-between white w-full md:max-w-lg mx-auto md:px-8">
      <BackButton isFirstStep={isFirstStep} />
      <NextButton isLastStep={isLastStep} />
      <ConfirmButton isLastStep={isLastStep} />
    </div>
  );
};
