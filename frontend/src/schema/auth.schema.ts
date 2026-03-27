import z from "zod";

export const createAccountSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().min(6).max(20)
})
export type CreateAccount = z.infer<typeof createAccountSchema>


export const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(20)
})
export type SignIn = z.infer<typeof signInSchema>


export type SuccessAuthResponse = {
    id: number,
    name: string,
    role: "buyer" | "agent" | "admin"
}