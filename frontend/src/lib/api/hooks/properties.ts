import { useInfiniteQuery } from "@tanstack/react-query"
import { api } from "../axios"
import type { PropertyResponse } from "../../../schema/property.types"

export function useGetAllProperties() {
    return useInfiniteQuery({
        queryKey: ["properties:get_all"],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await api.get("/property", {
                params: { page: pageParam, limit: 20 }
            })
            return response.data.data[0] as PropertyResponse
        },
        getNextPageParam: (lastPage) => {
            const pagination = lastPage.pagination
            return pagination.hasNext ? pagination.page + 1 : undefined
        },
        initialPageParam: 1
    })
}