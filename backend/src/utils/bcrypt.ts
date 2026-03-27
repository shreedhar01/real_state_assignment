import bcrypt from "bcrypt"
import { env } from "../config/env.js"

export const hashPassword = async (pass: string) => {
    return await bcrypt.hash(pass, env.SALT_ROUND)
}

export const comparePassword = async (orgiPass: string, hashPass: string) => {
    return await bcrypt.compare(orgiPass, hashPass)
}