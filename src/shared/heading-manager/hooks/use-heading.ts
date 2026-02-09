import { HeadingCtx } from "@/shared/heading-manager/hooks/HeadingCtx";
import { useContext } from "react";
import type { HeadingLevel } from "../types/heading-level";

function calculateNextHeadingLevel(
  currentLevel: HeadingLevel,
  hasH1: boolean,
): HeadingLevel {
  const nextLevel: HeadingLevel =
    currentLevel === 5 ? 5 : ((currentLevel + 1) as HeadingLevel);
  return hasH1 ? nextLevel : currentLevel;
}

export function useHeading(hasH1 = true) {
  const level = useContext(HeadingCtx);

  if (level === undefined) {
    console.warn(
      "[HeadingManager] HeadingCtx is undefined. Did you forget to wrap your Heading in a semantic wrapper (Main, Section, etc)?",
    );
  }
  return calculateNextHeadingLevel(level ?? 0, hasH1);
}
