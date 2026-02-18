export type TEXT_PATTERN = RegExp | string;
export type LABEL_LOCATOR = [TEXT_PATTERN, string];

export type TEXT_WITH_NTH = [TEXT_PATTERN, number];
export type TEXT_MATCHER = TEXT_PATTERN | TEXT_WITH_NTH;

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
