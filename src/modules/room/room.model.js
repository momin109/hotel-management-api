import { Schema, model } from "mongoose";

const roomSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["single", "double", "suite", "deluxe"],
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      default: 2,
    },
    amenities: [String],
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["available", "booked", "maintenance"],
      default: "available",
    },
    images: [String],
  },
  { timestamps: true }
);
const Room = model("Room", roomSchema);
export default Room;
