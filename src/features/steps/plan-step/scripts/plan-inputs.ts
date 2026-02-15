import { default as AdvancedIcon } from "@/assets/images/icon-advanced.svg";
import { default as ArcadeIcon } from "@/assets/images/icon-arcade.svg";
import { default as ProIcon } from "@/assets/images/icon-pro.svg";
import type { PersonalInfoType } from "../../personel-info/types/personal-info";
import type { PlanInputType, PlanType } from "../types/plan-type";

export const BILLING: PlanType["billing"][] = ["monthly", "yearly"];

export const PLANS_INPUTS: Record<PlanType["billing"], PlanInputType[]> = {
  yearly: [
    {
      name: "arcade",
      price: 90,
      discount: "2 months free",
      icon: ArcadeIcon,
      focus: true,
    },
    {
      name: "advanced",
      price: 120,
      discount: "2 months free",
      icon: AdvancedIcon,
    },
    {
      name: "pro",
      price: 150,
      discount: "2 months free",
      icon: ProIcon,
    },
  ],
  monthly: [
    {
      name: "arcade",
      price: 9,
      icon: ArcadeIcon,
      focus: true,
    },
    {
      name: "advanced",
      price: 12,
      icon: AdvancedIcon,
    },
    { name: "pro", price: 15, icon: ProIcon },
  ],
};

export const PLAN_REQUIRED_FIELDS: (keyof PersonalInfoType)[] = [
  "name",
  "email",
  "phone",
];
