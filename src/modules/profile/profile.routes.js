import express from "express";
import { updateProfile, changePassword } from "./profile.controller.js";
import protect from "../../middleware/auth.middleware.js";

const router = express.Router();

//Protected routes (required valid JWT)
router.use(protect);

router.patch("/", updateProfile);
router.patch("/password", changePassword);

export default router;
