import jwt, { type JwtPayload } from "jsonwebtoken"
import { env } from "../config/env.js"
import { roleEnum } from "../db/schema.js"

type JWT_Playload = {
    id: number,
    name: string,
    role: (typeof roleEnum.enumValues)[number]
}

type DecodedJwt = JwtPayload & JWT_Playload

export const jwtSign = async (data: JWT_Playload) => {
    return await jwt.sign(data, env.JWT_TOKEN, { expiresIn: env.JWT_LIFE })
}

export const jwtVerify = async (data: string) => {
    return await jwt.verify(data, env.JWT_TOKEN) as DecodedJwt
}