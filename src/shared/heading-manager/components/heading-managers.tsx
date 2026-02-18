import { HeadingCtx } from "@/shared/heading-manager/hooks/HeadingCtx";
import { forwardRef, useContext, type HTMLAttributes } from "react";
import { useHeading } from "../hooks/use-heading";

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
  const level = useHeading(pageHasH1);
  return (
    <main {...props} ref={ref}>
      <HeadingCtx.Provider value={level}>{children}</HeadingCtx.Provider>
    </main>
  );
});

export const Section = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, ref) => {
    const level = useHeading();
    return (
      <section {...props} ref={ref}>
        <HeadingCtx.Provider value={level}>{children}</HeadingCtx.Provider>
      </section>
    );
  },
);

export const Article = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, ref) => {
    const level = useHeading();
    return (
      <article {...props} ref={ref}>
        <HeadingCtx.Provider value={level}>{children}</HeadingCtx.Provider>
      </article>
    );
  },
);

export const Header = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, ref) => {
    const level = useHeading();
    return (
      <header {...props} ref={ref}>
        <HeadingCtx.Provider value={level}>{children}</HeadingCtx.Provider>
      </header>
    );
  },
);

export const Legend = forwardRef<
  HTMLLegendElement,
  HTMLAttributes<HTMLLegendElement>
>(({ children, ...props }, ref) => {
  const level = useHeading();
  return (
    <legend {...props} ref={ref}>
      <HeadingCtx.Provider value={level}>{children}</HeadingCtx.Provider>
    </legend>
  );
});
