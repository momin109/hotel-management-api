import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";

const server = http.createServer(app);

const port = process.env.PORT || 5000;

const main = async () => {
  try {
    await connectDB();
    server.listen(port, async () => {
      console.log("connection running");
    });
  } catch (error) {
    console.log("database error", error);
  }
};

main();
