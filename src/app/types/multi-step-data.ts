export type MultiStepData = {
  name: string;
  email: string;
  phone: string;
  plan: string;
  "add-ons": string[];
  billing: "monthly" | "yearly";
};

export type WithGoTo<T extends object> = T & { goTo: (index: number) => void };

export type WithBack<T extends object> = T & { back: () => void };
