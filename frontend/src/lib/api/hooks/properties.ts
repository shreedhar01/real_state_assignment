import { useInfiniteQuery, useMutation, useQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query"
import { api } from "../axios"
import type { EditFavouriteProperty, Property, PropertyResponse } from "../../../schema/property.types"

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

export function useAddFavourite() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["property:add_favourite"],
        mutationFn: async (id: number) => {
            const response = await api.post("/property/fav", { id })
            return response.data.data[0]
        },
        onSuccess: (data, id) => {
            queryClient.setQueryData<InfiniteData<PropertyResponse>>(['properties:get_all'], (old) => {
                if (!old) return old
                return {
                    ...old,
                    pages: old.pages.map(page => ({
                        ...page,
                        data: page.data.map(val =>
                            val.id === id ? ({ ...val, fav: data }) : val
                        )
                    }))
                }
            })
        }
    })
}


export function useRemoveFavourite() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["property:remove_favourite"],
        mutationFn: async (id: number) => {
            const response = await api.patch("/property/remove", { id })
            return response.data.data[0]
        },
        onSuccess: (data, id) => {
            queryClient.setQueryData<InfiniteData<PropertyResponse>>(['properties:get_all'], (old) => {
                if (!old) return old
                return {
                    ...old,
                    pages: old.pages.map(page => ({
                        ...page,
                        data: page.data.map(val =>
                            val.fav?.id === id ? ({ ...val, fav: { ...val.fav, status: false } } as Property) : val
                        )
                    }))
                }
            })
        }
    })
}

export function useEditFavouriteProperty() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["property:edit"],
        mutationFn: async (data: EditFavouriteProperty) => {
            const response = await api.patch("/property/edit", data)
            return response.data.data[0] as Property
        },
        onSuccess: (data) => {
            queryClient.setQueryData<InfiniteData<PropertyResponse>>(["properties:get_all"], (old) => {
                if (!old) return old
                return {
                    ...old,
                    pages: old.pages.map(page => ({
                        ...page,
                        data: page.data.map(val =>
                            val.id === data.id ? data : val
                        )
                    }))
                }
            })

            queryClient.setQueryData(["property:get_by_id", data.id], data)
        }
    })
}

export function useGetPropertyInfoById(propertyId: number) {
    const queryClient = useQueryClient()
    return useQuery({
        queryKey: ["property:get_by_id", propertyId],
        queryFn: async () => {

            const infiniteData = queryClient.getQueryData<InfiniteData<PropertyResponse>>(['properties:get_all'])
            if (infiniteData) {
                const cacheProperty = infiniteData.pages.flatMap(v => v.data).find(prop => prop.id === propertyId)
                if (cacheProperty) return cacheProperty
            }

            const response = await api.get("/property/info", {
                params: { propertyId }
            })
            return response.data.data[0] as Property
        }
    })
}