import express from "express";
import {
  createBookingController,
  getBookingsController,
  getSingleBookingController,
  updateBookingController,
  deleteBookingController,
} from "./booking.controller.js";
import protect from "../../middleware/auth.middleware.js";
// import authorize from "../../middleware/authorize.js";

const router = express.Router();

// protect all routes
router.use(protect);

// User creates booking
router.post("/", createBookingController);

// Admin/receptionist sees all bookings
router.get("/", getBookingsController);

// Get single booking (admin/receptionist or user own booking)
router.get("/:id", getSingleBookingController);

// Admin/receptionist update booking
router.patch("/:id", updateBookingController);

// Admin/receptionist delete booking
router.delete("/:id", deleteBookingController);

export default router;
