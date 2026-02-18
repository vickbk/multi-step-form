import type { TEXT_PATTERN } from "@tests/shared";

export type PersonalInfoData = {
  name?: string;
  email?: string;
  phone?: string;
};

export type PlanOptions = {
  plan?: TEXT_PATTERN;
  billing?: TEXT_PATTERN;
  personalInfo?: PersonalInfoData;
};
