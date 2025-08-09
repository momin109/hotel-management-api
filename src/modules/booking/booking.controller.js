import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "./booking.service.js";

export const createBookingController = async (req, res, next) => {
  try {
    const booking = await createBooking({
      ...req.body,
      user: req.user.id, // must have authentication middleware
    });
    res.status(201).json({ data: booking });
  } catch (error) {
    next(error);
  }
};

export const getBookingsController = async (req, res, next) => {
  try {
    const bookings = await getAllBookings(req.query);
    res.status(200).json({ data: bookings });
  } catch (error) {
    next(error);
  }
};

export const getSingleBookingController = async (req, res, next) => {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ data: booking });
  } catch (error) {
    next(error);
  }
};

export const updateBookingController = async (req, res, next) => {
  try {
    const booking = await updateBooking(req.params.id, req.body);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ data: booking });
  } catch (error) {
    next(error);
  }
};

export const deleteBookingController = async (req, res, next) => {
  try {
    const booking = await deleteBooking(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const createWalkInBookingController = async (req, res, next) => {
  try {
    const { name, email, phone, room, checkInDate, checkOutDate, totalPrice } =
      req.body;
    const customer = await createOrGetCustomer({ name, email, phone });
    const booking = await BookingService.createBooking({
      user: customer._id,
      room,
      checkInDate,
      checkOutDate,
      status: "confirmed",
      totalPrice,
    });

    res.status(201).json({ data: booking });
  } catch (error) {
    next(error);
  }
};
