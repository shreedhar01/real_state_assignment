import express from "express"
import { env } from "./config/env.js"

const app = express()

app.get("/",(_,res)=>{
    res.json({message:"Server is up and running"})
})

app.listen(env.PORT,()=>{
    console.log("Server is running in port :: ",env.PORT)
})