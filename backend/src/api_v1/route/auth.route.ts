import { Router, type Router as ExpressRouter } from "express";
import { registerUserController, signInUserController } from "../controller/auth.controller.js";

const router: ExpressRouter = Router()

router.route("/register").post(registerUserController)
router.route("/signin").post(signInUserController)

export default router