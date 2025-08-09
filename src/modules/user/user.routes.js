// src/modules/user/user.routes.js
import express from "express";
import {
  changeUserRole,
  changeUserStatus,
  getAllUsers,
  removeUserById,
} from "./user.controller.js";
import authorize from "../../middleware/authorize.js"; // optional
import { findSingleUser } from "./user.service.js";

const router = express.Router();

// শুধু admin panel এর জন্য, তাই authorize ব্যবহার করতে পারেন
router.get("/", getAllUsers);

//Get single user by id (e.g., /users/:id?expand=createdBy)
router.get("/:id", findSingleUser);

// Change user role (admin panel) → /users/:id/role
router.patch("/id/role", changeUserRole);

// Change user status → /users/:id/status
router.patch("/id/status", changeUserStatus);

//Delete user -> /users/:id
router.patch("/id/role", removeUserById);

export default router;
