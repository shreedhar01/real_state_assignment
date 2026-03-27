import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { user } from "../db/schema.js";
import type { RegisterUser, SignInUser } from "../schema/auth.schema.js";
import { ApiError } from "../utils/apiError.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { jwtSign } from "../utils/jwt.js";

export const registerUserService = async (data: RegisterUser) => {
    const [isUserExist] = await db
        .select()
        .from(user)
        .where(
            eq(user.email, data.email)
        )
    if (isUserExist) {
        throw new ApiError(400, "User exist with this email")
    }
    const hashPass = await hashPassword(data.password)
    const [registerUser] = await db
        .insert(user)
        .values({
            name: data.name,
            email: data.email,
            password: hashPass
        })
        .returning({
            id: user.id,
            name: user.name,
            role: user.role
        })
    if (!registerUser) {
        throw new ApiError(500, "user not created")
    }

    const isJwtSign = await jwtSign({
        ...registerUser,
        role: registerUser?.role || "buyer"
    })

    return {
        isJwtSign,
        registerUser
    }
}

export const signInUserService = async (data: SignInUser) => {
    const [isUserExist] = await db
        .select()
        .from(user)
        .where(
            eq(user.email, data.email)
        )
    if (!isUserExist) {
        throw new ApiError(400, "User not exist with this email")
    }

    const verifyPassword = await comparePassword(data.password, isUserExist.password)
    if (!verifyPassword) {
        throw new ApiError(400, "Incorrect password")
    }

    const { email, password, createdAt, ...userData } = isUserExist

    const isJwtSign = await jwtSign({
        ...userData,
        role: userData?.role || "buyer"
    })
    return {
        isJwtSign,
        signInUser: userData
    }
}