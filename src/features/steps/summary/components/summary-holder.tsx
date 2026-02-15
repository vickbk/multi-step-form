import { joinClasses } from "@/shared/libs";
import React from "react";

export const SummaryHolder = ({
  children,
  custom: custom = false,
  setStep,
  changeIndex,
}: {
  children: React.ReactNode;
  custom?: boolean;
  setStep?: (newStep: number) => void;
  changeIndex?: number;
}) => {
  return (
    <div
      className={joinClasses([
        "background p-4 not-first:pt-0 first:rounded-t-2xl last:rounded-b-2xl c-grey-500 last:[&>div.mt-4]:hidden",
      ])}
    >
      {children}
      {!custom && (
        <button
          type="button"
          className="change-btn"
          onClick={() => setStep?.(changeIndex ?? 0)}
        >
          Change
        </button>
      )}
      <div className="mt-4 border-b b-grey-500" />
    </div>
  );
};
