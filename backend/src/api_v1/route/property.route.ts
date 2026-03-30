import {
    Router,
    type Router as ExpressRouter
} from "express";
import { authentication } from "../middleware/auth.middleware.js";
import { addFavouritePropertyController, editFavouritePropertyController, getAllPropertyController, getPropertyInfoByIdController, removeFavouritePropertyController } from "../controller/property.controller.js";


const router: ExpressRouter = Router()

router.route("/fav").post(authentication, addFavouritePropertyController)
router.route("/remove").patch(authentication, removeFavouritePropertyController)
router.route("/edit").patch(authentication, editFavouritePropertyController)

router.route("/info").get(authentication, getPropertyInfoByIdController)
router.route("/").get(authentication, getAllPropertyController)


export default router