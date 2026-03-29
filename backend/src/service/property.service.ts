import { and, eq, sql } from "drizzle-orm"
import { db } from "../db/index.js"
import { favourite, property } from "../db/schema.js"
import { ApiError } from "../utils/apiError.js"
import type { EditFavouriteProperty } from "../schema/property.schema.js"

export const getAllPropertyService = async (page: number, limit: number, userId: number) => {
    const offset = (page - 1) * limit
    const allProperty = await db
        .select({
            id: property.id,
            title: property.title,
            description: property.description,
            price: property.price,
            area: property.area,
            city: property.city,
            province: property.province,
            fav: {
                id: favourite.id,
                property_id: favourite.propertyId,
                user_id: favourite.userId,
                status: favourite.status
            },
            count: sql`count(*) over()`
        })
        .from(property)
        .leftJoin(favourite, and(
            eq(favourite.propertyId, property.id),
            eq(favourite.userId, userId)
        ))
        .orderBy(property.price)
        .limit(limit)
        .offset(offset)

    if (allProperty.length === 0) {
        throw new ApiError(404, "Properties not found")
    }

    const total = Number(allProperty[0]!.count)

    return {
        data: allProperty.map(({ count, ...data }) => data),
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
        }
    }
}

export const addFavouritePropertyService = async (propertyId: number, userId: number) => {
    const [isFavourite] = await db
        .update(favourite)
        .set({
            status: true
        })
        .where(and(
            eq(favourite.userId, userId),
            eq(favourite.propertyId, propertyId)
        ))
        .returning({
            id: favourite.id,
            property_id: favourite.propertyId,
            user_id: favourite.userId,
            status: favourite.status
        })
    if (isFavourite) {
        return isFavourite
    }
    const [favAdded] = await db
        .insert(favourite)
        .values({
            userId,
            propertyId,
            status: true
        })
        .returning({
            id: favourite.id,
            property_id: favourite.propertyId,
            user_id: favourite.userId,
            status: favourite.status
        })
    if (!favAdded) {
        throw new ApiError(500, "unable to add to favourite")
    }
    return favAdded
}

export const removeFavouritePropertyService = async (favouriteId: number) => {
    const [isRemove] = await db
        .update(favourite)
        .set({ status: false })
        .where(
            eq(favourite.id, favouriteId)
        )
        .returning({
            id: favourite.id
        })
    if (!isRemove) {
        throw new ApiError(500, "favourite not remove")
    }
    return isRemove
}


export const editFavouritePropertyService = async (data: EditFavouriteProperty, userId: number) => {
    const [isFavourite] = await db
        .select({
            id: favourite.id,
            property_id: favourite.propertyId,
            user_id: favourite.userId,
            status: favourite.status
        })
        .from(favourite)
        .where(and(
            eq(favourite.userId, userId),
            eq(favourite.propertyId, data.id)
        ))
    if (!isFavourite) {
        throw new ApiError(404, "not favourite")
    }

    const [isRemove] = await db
        .update(property)
        .set({
            title: data.title,
            price: String(data.price),
            description: data.description
        })
        .where(
            eq(property.id, data.id)
        )
        .returning({
            id: property.id,
            title: property.title,
            description: property.description,
            price: property.price,
            area: property.area,
            city: property.city,
            province: property.province,
        })
    if (!isRemove) {
        throw new ApiError(500, "favourite not remove")
    }
    return {
        ...isRemove,
        fav: isFavourite
    }
}