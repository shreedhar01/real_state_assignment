import type { ReactNode } from "react"
import { ThemeProvider } from "../components/theme-provider"

export const ContextProviedr = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
        </ThemeProvider>
    )
}