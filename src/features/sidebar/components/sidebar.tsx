import { default as desktopImg } from "@/assets/images/bg-sidebar-desktop.svg";
import { default as mobileImg } from "@/assets/images/bg-sidebar-mobile.svg";
import type { ReactNode } from "react";

export const SideBar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative row-span-full">
      <picture className="absolute md:static -z-10 md:z-0 w-full">
        <source media="(min-width: 767px)" srcSet={desktopImg} />
        <img src={mobileImg} alt="sidebar" className="w-full h-auto" />
      </picture>
      {children}
    </div>
  );
};
