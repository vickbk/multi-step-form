import React from "react";

export const SummaryHolder = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="background p-4 first:rounded-t-2xl last:rounded-b-2xl c-grey-500 last:[&>div.mt-4]:hidden">
      {children}
      <button type="button" className="underline">
        Change
      </button>
      <div className="mt-4 border-b b-grey-500" />
    </div>
  );
};
