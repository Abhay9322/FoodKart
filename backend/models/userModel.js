import mongoose from "mongoose";

const userStructure = new mongoose.Schema({
    fullName: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    shoppingCart: { type: Object, default: {} }
}, { minimize: false });

const userCollection = mongoose.models.user || mongoose.model("user", userStructure);

export default userCollection;
