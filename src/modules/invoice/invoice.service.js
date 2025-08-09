import Invoice from "./invoice.model.js";
import Booking from "../booking/booking.model.js";
import { generateInvoiceNumber } from "../../utils/helpers.js";

export const createInvoiceForBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId)
    .populate("customerId")
    .populate("roomId");

  if (!booking) {
    throw new Error("Booking not found");
  }

  // calculate charges

  const roomCharges = booking.totalPrice;
  const tax = roomCharges * 0.15;
  const serviceCharge = roomCharges * 0.1;
  const totalAmount = roomCharges + tax + serviceCharge;

  const invoice = new Invoice({
    bookingId: booking._id,
    customerId: booking.customerId._id,
    invoiceNumber: generateInvoiceNumber(),
    issueDate: new Date(),
    dueDate: booking.checkOutDate,
    roomCharges,
    tax,
    serviceCharge,
    totalAmount,
    status: "pending",
  });

  return await invoice.save();
};

// get single invoice by id

export const getInvoiceById = async (invoiceId) => {
  return await Invoice.findById(invoiceId)
    .populate("bookingId")
    .populate("customerId");
};

// get all invoice for a customer

export const getInvoicesByCustomer = async (customerId) => {
  return await Invoice.find({ customerId })
    .populate("bookingId")
    .sort({ createdAt: -1 });
};

// get all invoice (optionally filtered)

export const getAllInvoices = async (filter = {}) => {
  return await Invoice.find(filter)
    .populate("bookingId")
    .populate("customerId")
    .sort({ createdAt: -1 });
};

// generate invoice Pdf (placeholder)

export const generateInvoicePdf = async (invoiceId) => {};
