import type { PersonalInfoInput } from "../types/personal-info";

export const PERSONEL_INFO_INPUTS: PersonalInfoInput[] = [
  {
    label: "Name",
    type: "text",
    placeholder: "e.g. Stephen King",
    name: "name",
  },
  {
    label: "Email Address",
    type: "email",
    placeholder: "e.g. stephenking@lorem.com",
    name: "email",
  },
  {
    label: "Phone Number",
    type: "tel",
    placeholder: "e.g. +1 234 567 890",
    name: "phone",
  },
];
