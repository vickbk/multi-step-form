export type MultiStepData = {
  name: string;
  email: string;
  phone: string;
  plan: string;
  addOns: string[];
  billing: "monthly" | "yearly";
};
