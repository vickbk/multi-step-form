import type { MultiStepData } from "@/app/types/multi-step-data";

export type PlanType = Pick<MultiStepData, "plan" | "billing">;

export type PlanInputType = {
  name: string;
  price: number;
  icon: string;
  discount?: string;
};
