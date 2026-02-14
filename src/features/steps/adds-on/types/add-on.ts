import type { MultiStepData } from "@/app/types/multi-step-data";

export type AddOns = Pick<MultiStepData, "add-ons" | "billing">;

export type AddOnInput = {
  name: string;
  label: string;
  description: string;
  price: number;
};
