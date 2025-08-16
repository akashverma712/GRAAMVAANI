
import { Router } from "express";
import { addAdditionalInfo } from "../controllers/userController.js";

const router = Router()


router.route("/additional-info").post(addAdditionalInfo);

export default router
