import mongoose from 'mongoose';

const orderStructure = new mongoose.Schema({
    customerId: { type: String, required: true },
    orderItems: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    deliveryAddress: { type: Object, required: true },
    orderStatus: { type: String, default: "Processing" },
    orderDate: { type: Date, default: Date.now },
    paymentStatus: { type: Boolean, default: false }
});

const orderCollection = mongoose.models.order || mongoose.model("order", orderStructure);

export default orderCollection;
