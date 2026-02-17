import type {
  MultiStepData,
  MultiStepFormData,
  MultiStepHandlerParams,
} from "../types";

export async function submitMultiStepSample(data: MultiStepData) {
  console.log("Form submitted with data:", data);
  return {};
}

export async function multistepsSubmitHandler({
  previous,
  data,
  isLastStep,
  step,
}: MultiStepHandlerParams<MultiStepFormData>): Promise<
  Partial<MultiStepFormData>
> {
  const formData = Object.fromEntries(data);
  const results: Partial<MultiStepFormData> = { ...previous, ...formData };
  if ("go-to" in results) delete results["go-to"];
  if (isLastStep) {
    await submitMultiStepSample(results as MultiStepData);
    return results;
  }
  if (step === 2) {
    return { ...results, "add-ons": data.getAll("add-ons") as string[] };
  }
  return results;
}
