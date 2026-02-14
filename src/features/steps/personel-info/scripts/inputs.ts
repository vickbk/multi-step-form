import type { PersonalInfoInput } from "../types/personal-info";

export const PERSONEL_INFO_INPUTS: PersonalInfoInput[] = [
  {
    label: "Name",
    type: "text",
    placeholder: "e.g. Stephen King",
    name: "name",
    errorMessage: "This field is required",
  },
  {
    label: "Email Address",
    type: "email",
    placeholder: "e.g. stephenking@lorem.com",
    name: "email",
    errorMessage: "Please enter a valid email address",
    pattern: "[^@\\s]+@[^@\\s]+\\.[^@\\s]+",
  },
  {
    label: "Phone Number",
    type: "tel",
    placeholder: "e.g. +1 234 567 890",
    name: "phone",
    errorMessage: "Please enter a valid phone number",
    pattern:
      "^\\+?[0-9]{1,4}?[-.\\s]?\\(?[0-9]{1,3}?\\)?[-.\\s]?[0-9]{1,4}[-.\\s]?[0-9]{1,4}[-.\\s]?[0-9]{1,9}$",
  },
];
