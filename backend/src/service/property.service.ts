import { sql } from "drizzle-orm"
import { db } from "../db/index.js"
import { property } from "../db/schema.js"
import { ApiError } from "../utils/apiError.js"

export const getAllPropertyService = async (page: number, limit: number) => {
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
            count: sql`count(*) over()`
        })
        .from(property)
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