import type { ReactNode } from 'react'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                retry: 1
            }
        }
    })
    
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}