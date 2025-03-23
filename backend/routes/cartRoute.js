import express from 'express'
import { addItemToCart,removeItemFromCart,fetchCartData } from '../controllers/cartController.js';
import verifyAuth from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post("/add", verifyAuth, addItemToCart)
cartRouter.post("/remove",verifyAuth, removeItemFromCart)
cartRouter.post("/get",verifyAuth, fetchCartData)

export default cartRouter;
