import mongoose, { Schema, disconnect, model } from "mongoose";

const invoiceSchema = new Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoiceNumber: {
      type: String,
      unique: true,
      required: true,
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    romeChanges: {
      type: Number,
      required: true,
    },
    additionalChange: [
      {
        description: String,
        amount: Number,
      },
    ],
    disconnect: {
      type: Number,
      default: 0,
    },
    serviceCharge: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "partial", "paid", "refunded", "cancelled"],
      default: "pending",
    },
    notes: String,
  },
  { timestamps: true }
);

const Invoice = model("Invoice", invoiceSchema);

export default Invoice;
