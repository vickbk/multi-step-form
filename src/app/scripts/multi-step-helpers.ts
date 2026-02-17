import type { MultiStepData, MultiStepHandlerParams } from "../types";

export async function submitMultiStepSample(data: MultiStepData) {
  console.log("Form submitted with data:", data);
  return {};
}

export async function multistepsSubmitHandler({
  previous,
  data,
  isLastStep,
  step,
}: MultiStepHandlerParams<MultiStepData>): Promise<MultiStepData> {
  const formData = Object.fromEntries(data);
  const results: MultiStepData = { ...previous, ...formData };
  if ("go-to" in results) delete results["go-to"];
  if (isLastStep) {
    await submitMultiStepSample(results);
    return {} as MultiStepData;
  }
  if (step === 2) {
    return { ...results, "add-ons": data.getAll("add-ons") as string[] };
  }
  return results;
}
