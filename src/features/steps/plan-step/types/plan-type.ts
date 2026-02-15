import type { MultiStepData } from "@/app/types";
import type { PersonalInfoType } from "../../personel-info";

export type PlanType = PersonalInfoType &
  Pick<MultiStepData, "plan" | "billing">;

export type PlanInputType = {
  name: string;
  price: number;
  icon: string;
  discount?: string;
  focus?: boolean;
};
