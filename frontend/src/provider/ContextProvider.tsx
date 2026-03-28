import type { ReactNode } from "react"
import { ThemeProvider } from "../components/theme-provider"
import { Toaster } from "react-hot-toast"
import { ReactQueryProvider } from "./ReactQuery"
import { AuthProvider } from "./AuthProvider"

export const ContextProviedr = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ReactQueryProvider>
                <AuthProvider>
                    <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                    />
                    {children}
                </AuthProvider>
            </ReactQueryProvider>
        </ThemeProvider>
    )
}