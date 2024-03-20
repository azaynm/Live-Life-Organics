import { Router } from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";



const router = Router();


router.get('/orders', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
})




router.post("/add-order", async (req, res) => {
    try {
        const { foods, amount, customer, paymentId, status } = req.body;


        // Create a new order document
        const newOrder = new Order({
            foods,
            amount,
            customer,
            paymentId,
            status
        });

        // Save the new order to the database
        await newOrder.save();

        res.json('Order Added to the DB');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.get('/:status', async (req, res) => {
    const status = req.params.status;
    try {
        const readyOrders = await Order.find({ status: status });
        res.json(readyOrders);
    } catch (error) {
        console.error(`Error fetching ${status}:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
});



router.put('/update-status/:id', async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;