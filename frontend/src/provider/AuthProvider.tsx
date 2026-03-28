import { createContext, useContext, type ReactNode } from "react";
import type { SuccessAuthResponse } from "../schema/auth.schema";
import { useVerifyMe } from "../lib/api/hooks/auth";

interface AuthContext {
    data: SuccessAuthResponse,
    loading: boolean

}

const authContext = createContext<AuthContext | null>(null)

export function useAuth() {
    const context = useContext(authContext)
    if (!context) throw new Error("Not a context provided")
    return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data, isLoading } = useVerifyMe()
    return (
        <authContext.Provider value={{ data: data, loading: isLoading }}>
            {children}
        </authContext.Provider>
    )
}