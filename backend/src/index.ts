import express from "express"
import { PORT } from "./config/env.js"

const app = express()

app.get("/",(_,res)=>{
    res.json({message:"Server is up and running"})
})

app.listen(PORT,()=>{
    console.log("Server is running in port :: ",PORT)
})