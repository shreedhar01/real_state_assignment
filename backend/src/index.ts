import express, { type NextFunction, type Request, type Response } from "express"
import { env } from "./config/env.js"
import authRouter from "./api_v1/route/auth.route.js"
import type { ApiError } from "./utils/apiError.js"

const app = express()
app.use(express.json())

app.get("/", (_, res) => {
    res.json({ message: "Server is up and running" })
})

app.use("/", authRouter)

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        success: false,
        message: err.message,
        errors: err.error
    })
})

app.listen(env.PORT, () => {
    console.log("Server is running in port :: ", env.PORT)
})