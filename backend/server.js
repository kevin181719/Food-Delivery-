import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/Foodroute.js"; 
import userRouter from "./routes/userRouts.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRout.js";
import orderRoute from "./routes/orderRout.js";

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json()); // Required to parse JSON request body
app.use(cors());

// DB Connection
connectDB();

// Serve static files (uploaded images)
app.use("/images", express.static("uploads")); // Access uploaded files via /images

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRoute);

// Default Route
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});