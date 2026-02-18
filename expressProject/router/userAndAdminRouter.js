import { Router } from "express";
import { userLoginController } from "../controller/userLoginController.js";
import { adminLoginController } from "../controller/adminLoginController.js";

const router = Router()

router.route("/user-login").post(userLoginController)
router.route("/admin-login").post(adminLoginController)

export default router;