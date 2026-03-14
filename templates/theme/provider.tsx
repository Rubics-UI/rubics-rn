import type { ReactNode } from "react"
import { createContext, useContext, useMemo, useState } from "react"
import { useColorScheme } from "react-native"

import { darkPalette, lightPalette } from "./palette"
import type { AppTheme } from "./types"

type ThemeContextValue = {
  colorMode: "light" | "dark"
  theme: AppTheme
  toggleColorMode: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme() ?? "light"

  const [colorMode, setColorMode] = useState<"light" | "dark">(
    scheme === "dark" ? "dark" : "light"
  )

  const value = useMemo(
    () => ({
      colorMode,
      theme: colorMode === "dark" ? darkPalette : lightPalette,
      toggleColorMode: () =>
        setColorMode((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    [colorMode]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)

  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return ctx
}