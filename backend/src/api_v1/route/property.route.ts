import {
    Router,
    type Router as ExpressRouter
} from "express";
import { authentication } from "../middleware/auth.middleware.js";
import { getAllPropertyController } from "../controller/property.controller.js";


const router: ExpressRouter = Router()

router.route("/").get(authentication, getAllPropertyController)



export default router