import mongoose from "mongoose";
//Will set all the required fields to true right now most of them are false so i can test on postman
//Hello
const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    requied: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  menuItem: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  deliveryMethod: {
    type: String,
    required: false,
  },
  paymentMethod: {
    type: String,
    required: false,
  },
});
const Order = mongoose.model("Order", orderSchema);
export default Order;
