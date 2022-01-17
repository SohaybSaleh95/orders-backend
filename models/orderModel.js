const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderType: { type: String, required: true },
    orderBy: { type: mongoose.Types.ObjectId, ref: 'user' },
    transportBy: { type: mongoose.Types.ObjectId, ref: 'user' },
    fromCity: { type: mongoose.Types.ObjectId, ref: 'city', required: true },
    toCity: { type: mongoose.Types.ObjectId, ref: 'city', required: true },
    service: { type: mongoose.Types.ObjectId, ref: 'service' },
    date: { type: Date, required: true },
    passengers: { type: Number },
    createdAt: { type: Date, default: Date.now() },
    notes: { type: String },
    status: { type: String, default: 'NEW' },
    rating: { type: Number }
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
