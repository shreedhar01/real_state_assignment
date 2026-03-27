import { Router, type Router as ExpressRouter } from "express";
import { registerUserController } from "../controller/auth.controller.js";

const router:ExpressRouter = Router()

router.route("").post(registerUserController)

export default router