import express from "express"
import verifyAuth from "./../middleware/auth.js";
import { createOrder,confirmOrder,getUserOrders,getAllOrders,changeOrderStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place",verifyAuth,createOrder);
orderRouter.post("/verify", confirmOrder)
orderRouter.post("/userorders",verifyAuth,getUserOrders)
orderRouter.get('/list',getAllOrders)
orderRouter.post('/status', changeOrderStatus)

export default orderRouter;

