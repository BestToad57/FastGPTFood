// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    items: { type: [String], required: true }, // Array of item names
    deliveryType: { type: String, required: true },
    paymentType: { type: String, required: true },
    totalCost: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
