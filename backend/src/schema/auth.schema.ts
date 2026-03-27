import z from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().min(6).max(20)
})
export type RegisterUser = z.infer<typeof registerUserSchema>


export const signInUserSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(20)
})
export type SignInUser = z.infer<typeof signInUserSchema>