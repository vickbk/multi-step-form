import { createContext } from "react";
import type { HeadingLevel } from "../types/heading-level";

export const HeadingCtx = createContext<HeadingLevel>(0);
