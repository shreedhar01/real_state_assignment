import z from "zod";

export type Favorite = {
    id: number;
    property_id: number;
    user_id: number;
    status: boolean
}

export type Property = {
    id: number;
    title: string;
    description: string;
    price: string;
    area: string;
    city: string;
    province: string;
    fav?: Favorite;
}

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export type PropertyResponse = {
    data: Property[];
    pagination: Pagination;
}


export const editFavouritePropertySchema = z.object({
    id: z.number(),
    title: z.string().min(3).max(255),
    price: z.number(),
    description: z.string()
})
export type EditFavouriteProperty = z.infer<typeof editFavouritePropertySchema>