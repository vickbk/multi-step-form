import React from "react";

export const SummaryHolder = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <button>Change</button>
    </div>
  );
};
