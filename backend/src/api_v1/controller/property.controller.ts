import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { addFavouritePropertyService, getAllPropertyService } from "../../service/property.service.js";
import { ApiError } from "../../utils/apiError.js";

export const getAllPropertyController = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.query
    const pageNumber = Math.max(1, Number(page) || 1)
    const limitNumber = Math.min(50, Number(limit) || 10)

    console.log("pageNumber", pageNumber)
    console.log("limitNumber", limitNumber)

    const allProperty = await getAllPropertyService(pageNumber, limitNumber, req.user!.id)
    return res.status(200).json(
        new ApiResponse(200, [allProperty], "all property fetch successfully")
    )
})

export const addFavouritePropertyController = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body
    if (!id) {
        throw new ApiError(401, "id not given")
    }
    const fav = await addFavouritePropertyService(Number(id), req.user!.id)
    return res.status(200).json(
        new ApiResponse(200, [fav], "successfully added to favourite")
    )
})