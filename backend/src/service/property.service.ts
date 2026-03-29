import { and, eq, sql } from "drizzle-orm"
import { db } from "../db/index.js"
import { favourite, property } from "../db/schema.js"
import { ApiError } from "../utils/apiError.js"

export const getAllPropertyService = async (page: number, limit: number, userId:number) => {
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
                user_id: favourite.userId
            },
            count: sql`count(*) over()`
        })
        .from(property)
        .leftJoin(favourite, and(
            eq(favourite.propertyId,property.id),
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
        data:allProperty.map(({count,...data})=> data),
        pagination:{
            total,
            page,
            limit,
            totalPages: Math.ceil(total/limit),
            hasNext: page < Math.ceil(total/limit),
            hasPrev: page > 1
        }
    }
}