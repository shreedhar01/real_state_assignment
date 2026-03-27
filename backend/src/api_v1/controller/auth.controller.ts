import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ApiError } from "../../utils/apiError.js";
import { registerUserSchema, signInUserSchema } from "../../schema/auth.schema.js";
import { registerUserService, signInUserService } from "../../service/auth.service.js";
import { env } from "../../config/env.js";

export const registerUserController = asyncHandler(async (req: Request, res: Response) => {
    const isValid = registerUserSchema.safeParse(req.body)
    if (!isValid.success) {
        const err = isValid.error.issues.flatMap(v => ({
            path: v.path[0],
            message: v.message
        }))
        throw new ApiError(400, "Error while validating input", err)
    }

    const user = await registerUserService(isValid.data)

    const option = {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
        maxAge: env.JWT_LIFE,
        path: "/"
    }

    return res
        .cookie("auth", user.isJwtSign, option)
        .status(200)
        .json(
            new ApiResponse(200, [user.registerUser], "user register successfully")
        )
})


export const signInUserController = asyncHandler(async (req: Request, res: Response) => {
    const isValid = signInUserSchema.safeParse(req.body)
    if (!isValid.success) {
        const err = isValid.error.issues.flatMap(v => ({
            path: v.path[0],
            message: v.message
        }))
        throw new ApiError(400, "Error while validating input", err)
    }

    const user = await signInUserService(isValid.data)

    const option = {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
        maxAge: env.JWT_LIFE,
        path: "/"
    }

    return res
        .cookie("auth", user.isJwtSign, option)
        .status(200)
        .json(
            new ApiResponse(200, [user.signInUser], "user register successfully")
        )
})