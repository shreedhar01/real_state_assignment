import z from "zod";

export const editFavouritePropertySchema = z.object({
    id: z.number(),
    title: z.string().min(3).max(255),
    price: z.number(),
    description: z.string()
})
export type EditFavouriteProperty = z.infer<typeof editFavouritePropertySchema>