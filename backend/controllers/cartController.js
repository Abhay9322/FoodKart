import User from './../models/userModel.js';

// Add item to user cart
const addItemToCart = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let cart = user.cartData || {};

        // Increment item count or add new item
        cart[req.body.itemId] = (cart[req.body.itemId] || 0) + 1;

        await User.findByIdAndUpdate(req.body.userId, { cartData: cart });
        res.status(200).json({ success: true, message: 'Item added to cart' });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: 'Failed to add item to cart' });
    }
};

// Remove item from user cart
const removeItemFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let cart = user.cartData || {};

        if (cart[req.body.itemId] && cart[req.body.itemId] > 0) {
            cart[req.body.itemId] -= 1;
        }

        await User.findByIdAndUpdate(req.body.userId, { cartData: cart });
        res.status(200).json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ success: false, message: 'Failed to remove item from cart' });
    }
};

// Get user's cart data
const fetchCartData = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, cartData: user.cartData || {} });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch cart data' });
    }
};

export { addItemToCart, removeItemFromCart, fetchCartData };
