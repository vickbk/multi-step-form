import type { MultiStepFormData } from "@/app/types";
import type { PlanType } from "../../plan-step/types/plan-type";

export type AddOns = PlanType & Pick<MultiStepFormData, "add-ons">;

export type AddOnInput = {
  name: string;
  label: string;
  description: string;
  price: number;
  focus?: boolean;
};

export type AddOn = Pick<PlanType, "billing"> & { "add-on": string };
