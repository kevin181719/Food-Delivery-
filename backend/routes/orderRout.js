import express from 'express';
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js';
import authMiddelware from '../middleware/auth.js';


const orderRoute = express.Router();

orderRoute.post("/place", authMiddelware, placeOrder);
orderRoute.post("/verify", verifyOrder);
orderRoute.post("/userorders",authMiddelware,userOrders);
orderRoute.get("/list",listOrders);
orderRoute.post("/status",updateStatus)

export default orderRoute;