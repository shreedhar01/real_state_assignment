import {
    Router,
    type Router as ExpressRouter
} from "express";
import { authentication } from "../middleware/auth.middleware.js";
import { addFavouritePropertyController, getAllPropertyController } from "../controller/property.controller.js";


const router: ExpressRouter = Router()

router.route("/").get(authentication, getAllPropertyController)
router.route("/fav").post(authentication, addFavouritePropertyController)



export default router