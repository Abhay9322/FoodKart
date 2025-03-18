import mongoose from "mongoose";

const foodStructure = new mongoose.Schema({
    itemName: { type: String, required: true },
    itemDescription: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    foodCategory: { type: String, required: true }
});

const foodCollection = mongoose.models.food || mongoose.model("food", foodStructure);

export default foodCollection;
