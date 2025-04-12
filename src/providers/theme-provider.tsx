"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, ...rest } = props;
  return <NextThemesProvider {...rest}>{children}</NextThemesProvider>;
};
