import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    InvoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: [
        "cash",
        "credit_card",
        "debit_card",
        "bkash",
        "nagad",
        "bank_transfer",
        "other",
      ],
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    transactionId: String,
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: String,
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "completed",
    },
  },
  { timestamps: true }
);

const Payment = model("payment", paymentSchema);

export default Payment;
