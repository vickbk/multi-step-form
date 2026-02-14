import type { MultiStepData } from "@/app/types/multi-step-data";
import type { PersonalInfoType } from "../../personel-info/types/personal-info";

export type PlanType = PersonalInfoType &
  Pick<MultiStepData, "plan" | "billing">;

export type PlanInputType = {
  name: string;
  price: number;
  icon: string;
  discount?: string;
};
