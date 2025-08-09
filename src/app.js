import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/user/user.routes.js";
import profileRouter from "./modules/profile/index.js";
import roomRouter from "./modules/room/room.routes.js";
import bookingRouter from "./modules/booking/booking.routes.js";

const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/room", roomRouter);
app.use("/api/booking", bookingRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    health: "OK",
    user: req.user || null,
  });
});

if (process.env.NODE_ENV === "development") {
  console.log("you are in development mode");
} else {
  console.log("You're in production mode");
}

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Error occurred:", err); //
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
