import { PLAN_REQUIRED_FIELDS } from "../../plan-step/scripts/plan-inputs";
import type { AddOnInput, AddOns } from "../types/add-on";

export const ADDONS_INPUTS: Record<"yearly" | "monthly", AddOnInput[]> = {
  yearly: [
    {
      name: "online-service",
      label: "Online service",
      description: "Access to multiplayer games",
      price: 10,
      focus: true,
    },
    {
      label: "Larger storage",
      name: "larger-storage",
      description: "Extra 1TB of cloud save",
      price: 20,
    },
    {
      label: "Customizable profile",
      name: "customizable-profile",
      description: "Custom theme on your profile",
      price: 20,
    },
  ],
  monthly: [
    {
      name: "online-service",
      label: "Online service",
      description: "Access to multiplayer games",
      price: 1,
      focus: true,
    },
    {
      label: "Larger storage",
      name: "larger-storage",
      description: "Extra 1TB of cloud save",
      price: 2,
    },
    {
      name: "customizable-profile",
      label: "Customizable profile",
      description: "Custom theme on your profile",
      price: 2,
    },
  ],
};

export const ADDON_REQUIRED_FIELDS: (keyof AddOns)[] = [
  ...PLAN_REQUIRED_FIELDS,
  "billing",
  "plan",
];
