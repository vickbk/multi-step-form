import { HeadingCtx } from "@/shared/heading-manager";

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <HeadingCtx.Provider value={0}>{children}</HeadingCtx.Provider>;
};
