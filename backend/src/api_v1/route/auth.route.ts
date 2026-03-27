import {
    Router,
    type Router as ExpressRouter
} from "express";
import {
    logOutUserController,
    registerUserController,
    signInUserController
} from "../controller/auth.controller.js";
import { authentication } from "../middleware/auth.middleware.js";

const router: ExpressRouter = Router()

router.route("/register").post(registerUserController)
router.route("/signin").post(signInUserController)
router.route("/logout").post(authentication, logOutUserController)

export default router