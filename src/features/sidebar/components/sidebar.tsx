import { default as desktopImg } from "@/assets/images/bg-sidebar-desktop.svg";
import { default as mobileImg } from "@/assets/images/bg-sidebar-mobile.svg";
import { FormSteps } from "./form-steps";

export const SideBar = () => {
  return (
    <div className="relative">
      <picture className="absolute -z-10 w-full">
        <source media="(min-width: 1024px)" srcSet={desktopImg} />
        <img src={mobileImg} alt="sidebar" className="w-full h-auto" />
      </picture>
      <FormSteps />
    </div>
  );
};
