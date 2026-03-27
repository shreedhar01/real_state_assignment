import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { jwtVerify } from "../../utils/jwt.js";
import { db } from "../../db/index.js";
import { user } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export const authentication = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { auth } = req.cookies
    if (!auth) {
        throw new ApiError(400, "unauthorize access")
    }

    const isValid = await jwtVerify(auth)
    if (!isValid) {
        throw new ApiError(400, "invalid jwt")
    }
    if (Date.now() > (isValid.exp ?? 0) * 1000) {
        throw new ApiError(400, "Cookie expire")
    }
    const [isUser] = await db
        .select({
            id: user.id,
            email: user.email
        })
        .from(user)
        .where(
            eq(user.id, isValid.id)
        )
    if (!isUser) {
        throw new ApiError(404, "User not found")
    }

    req.user = {
        id: isUser.id,
        email: isUser.email
    }
    next()
})