import express from "express";
import {
  createRoomController,
  getAllRoomsController,
  getRoomByIdController,
  updateRoomController,
  deleteRoomController,
  getAvailableRoomsController,
  updateRoomStatusController,
} from "./room.controller.js";

const router = express.Router();

// Create a new room
router.post("/", createRoomController);

// Get all rooms (with optional filters)
router.get("/", getAllRoomsController);

// Get available rooms (optionally filtered by type)
router.get("/available", getAvailableRoomsController);

// Get a specific room by ID
router.get("/:id", getRoomByIdController);

// Update a room
router.put("/:id", updateRoomController);

// Update room status
router.patch("/:id/status", updateRoomStatusController);

// Delete a room
router.delete("/:id", deleteRoomController);

export default router;
