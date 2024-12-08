//Chou's code i have move over here
//just move it back to server.js to test your stuff
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import Order from "./models/Order.js";
dotenv.config();
const app = express();
app.use(express.json()); //allow us to accept data in the req.body
app.get("/", async (req, res) => {
  res.json("server is running.");
  console.log("Server is running.");
});
app.post("/api/order", async (req, res) => {
  const order = req.body; //user will send this data
  if (!order.customerName || !order.phoneNumber) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter name and phone number." });
  }
  const newOrder = new Order(order);
  try {
    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error("Error creating an order: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
app.listen(3000, () => {
  connectDB();
});
