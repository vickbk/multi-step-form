export type MultiStepData = {
  name: string;
  email: string;
  phone: string;
  plan: string;
  "add-ons": string[];
  billing: "monthly" | "yearly";
};
