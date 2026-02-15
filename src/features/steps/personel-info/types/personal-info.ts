import type { MultiStepData } from "@/app/types";

export type PersonalInfoType = Pick<MultiStepData, "name" | "email" | "phone">;

export type PersonalInfoInput = {
  label: string;
  type: string;
  placeholder: string;
  name: keyof PersonalInfoType;
  errorMessage: string;
  pattern?: string;
  focus?: boolean;
};
