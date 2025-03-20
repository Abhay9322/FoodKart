import fs from 'fs';
import Food from '../models/foodModel.js';

// Add a new food item
const createFoodItem = async (req, res) => {
    const imageName = req.file.filename;

    const newFood = new Food({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imageName
    });

    try {
        await newFood.save();
        res.status(201).json({ success: true, message: 'New food item added successfully!' });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: 'Failed to add food item. Please try again.' });
    }
};

// Get all food items
const getAllFoodItems = async (req, res) => {
    try {
        const foodList = await Food.find({});
        res.status(200).json({ success: true, data: foodList });
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.status(500).json({ success: false, message: 'Failed to retrieve food items. Please try again.' });
    }
};

// Remove a food item
const deleteFoodItem = async (req, res) => {
    try {
        const foodItem = await Food.findById(req.body.id);
        if (!foodItem) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }

        // Remove image file from uploads folder
        fs.unlink(`uploads/${foodItem.image}`, (err) => {
            if (err) console.error("Error deleting image file:", err);
        });

        await Food.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: 'Food item removed successfully!' });
    } catch (error) {
        console.error("Error deleting food item:", error);
        res.status(500).json({ success: false, message: 'Failed to remove food item. Please try again.' });
    }
};

export { createFoodItem, getAllFoodItems, deleteFoodItem };
