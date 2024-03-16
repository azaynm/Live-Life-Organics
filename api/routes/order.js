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
        const { amount, customer, paymentId, adminApproved } = req.body;

        // Filter the cart items based on the userName (assuming it's a property of each cart item)
        const filteredFoods = await Cart.find({ userName: 'maleesha4' });

        // Create a new order document
        const newOrder = new Order({
            foods: filteredFoods,
            amount,
            customer,
            paymentId,
            adminApproved
        });

        // Save the new order to the database
        await newOrder.save();

        res.json('Order Added to the DB');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});


export default router;