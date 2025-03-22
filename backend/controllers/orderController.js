import Order from './../models/orderModel.js';
import User from './../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing an order
const createOrder = async (req, res) => {
    const clientURL = 'http://localhost:5173';
    try {
        const order = new Order({
            userId: req.body.userId,
            items: req.body.items,
            totalAmount: req.body.amount,
            deliveryAddress: req.body.address,
        });

        await order.save();
        await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const products = req.body.items.map((product) => ({
            price_data: {
                currency: 'LKR',
                product_data: { name: product.name },
                unit_amount: product.price * 100 * 300,
            },
            quantity: product.quantity,
        }));

        // Adding Delivery Fee
        products.push({
            price_data: {
                currency: 'LKR',
                product_data: { name: 'Shipping Fee' },
                unit_amount: 2 * 100 * 80,
            },
            quantity: 1,
        });

        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: products,
            mode: 'payment',
            success_url: `${clientURL}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${clientURL}/verify?success=false&orderId=${order._id}`,
        });

        res.status(200).json({ success: true, checkoutURL: checkoutSession.url });
    } catch (error) {
        console.error('Order placement failed:', error);
        res.status(500).json({ success: false, message: 'Failed to place order' });
    }
};

// Verifying order payment status
const confirmOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === 'true') {
            await Order.findByIdAndUpdate(orderId, { paymentStatus: true });
            res.status(200).json({ success: true, message: 'Payment successful' });
        } else {
            await Order.findByIdAndDelete(orderId);
            res.status(400).json({ success: false, message: 'Payment failed' });
        }
    } catch (error) {
        console.error('Order verification error:', error);
        res.status(500).json({ success: false, message: 'Verification failed' });
    }
};

// Fetching user orders
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.body.userId });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Fetching user orders failed:', error);
        res.status(500).json({ success: false, message: 'Could not retrieve orders' });
    }
};

// Admin: Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Fetching all orders failed:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
};

// Updating order status
const changeOrderStatus = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.status(200).json({ success: true, message: 'Order status updated' });
    } catch (error) {
        console.error('Updating order status failed:', error);
        res.status(500).json({ success: false, message: 'Could not update order status' });
    }
};

export { createOrder, confirmOrder, getUserOrders, getAllOrders, changeOrderStatus };
