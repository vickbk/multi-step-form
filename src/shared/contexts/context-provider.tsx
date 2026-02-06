import { HeadingCtx } from "./HeadingCtx";

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <HeadingCtx value={0}>{children}</HeadingCtx>;
};
