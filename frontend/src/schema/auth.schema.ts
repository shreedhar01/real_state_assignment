import z from "zod";

export const createAccountSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().min(6).max(20)
})
export type CreateAccount = z.infer<typeof createAccountSchema>