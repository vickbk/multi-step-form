import type { MultiStepData } from "@/app/types";
import type { PlanType } from "../../plan-step/types/plan-type";

export type AddOns = PlanType & Pick<MultiStepData, "add-ons">;

export type AddOnInput = {
  name: string;
  label: string;
  description: string;
  price: number;
  focus?: boolean;
};

export type AddOn = Pick<PlanType, "billing"> & { "add-on": string };
