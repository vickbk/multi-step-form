import { HeadingCtx } from "@/shared/heading-manager";

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <HeadingCtx value={0}>{children}</HeadingCtx>;
};
