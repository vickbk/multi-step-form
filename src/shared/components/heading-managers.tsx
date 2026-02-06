import { HeadingCtx } from "@/shared/contexts/HeadingCtx";
import { forwardRef, useContext, type HTMLAttributes } from "react";

export const Heading = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ children, ...props }, ref) => {
  const level = useContext(HeadingCtx);
  const headings = [
    <h1 {...props} ref={ref}>
      {children}
    </h1>,
    <h2 {...props} ref={ref}>
      {children}
    </h2>,
    <h3 {...props} ref={ref}>
      {children}
    </h3>,
    <h4 {...props} ref={ref}>
      {children}
    </h4>,
    <h5 {...props} ref={ref}>
      {children}
    </h5>,
    <h6 {...props} ref={ref}>
      {children}
    </h6>,
  ];
  return <>{headings[level]}</>;
});

export const Main = forwardRef<
  HTMLElement,
  { pageHasH1?: boolean } & HTMLAttributes<HTMLElement>
>(({ pageHasH1 = true, children, ...props }, ref) => {
  const level = useContext(HeadingCtx);
  return (
    <main {...props} ref={ref}>
      <HeadingCtx value={pageHasH1 ? level + 1 : level}>{children}</HeadingCtx>
    </main>
  );
});

export const Section = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, ref) => {
    const level = useContext(HeadingCtx);
    return (
      <section {...props} ref={ref}>
        <HeadingCtx value={level + 1}>{children}</HeadingCtx>
      </section>
    );
  },
);

export const Article = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, ref) => {
    const level = useContext(HeadingCtx);
    return (
      <article {...props} ref={ref}>
        <HeadingCtx value={level + 1}>{children}</HeadingCtx>
      </article>
    );
  },
);

export const Header = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, ref) => {
    const level = useContext(HeadingCtx);
    return (
      <header {...props} ref={ref}>
        <HeadingCtx value={level + 1}>{children}</HeadingCtx>
      </header>
    );
  },
);
