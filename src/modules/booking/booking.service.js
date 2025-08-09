import Booking from "./booking.model.js";
import User from "../user/user.model.js";

export const createBooking = async (bookingData) => {
  const booking = new Booking(bookingData);
  return await booking.save();
};

export const getAllBookings = async (filter = {}) => {
  return await Booking.find(filter).populate("user room");
};

export const getBookingById = async (id) => {
  return await Booking.findById(id).populate("user room");
};

export const updateBooking = async (id, updateData) => {
  return await Booking.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate("user room");
};

export const deleteBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};

export const createOrGetCustomer = async ({ name, email, phone }) => {
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name,
      email,
      phone,
      role: "customer",
      createdFrom: "admin",
      isVerified: true,
    });
  }
  return user;
};
