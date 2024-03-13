import { Router } from "express";
import Inventory from "../models/Inventory.js";

const router = Router();

router.get('/inventory', async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




router.post("/add-delivery", async (req, res) => {
    const { foodId, itemName, quantity, category, supplier, cost, sellingPrice } = req.body;
    
    const newInventoryData = {
        foodId,
        itemName,
        quantity,
        category,
        supplier,
        cost,
        sellingPrice
    };

    const newInventory = new Inventory(newInventoryData);

    try {
        await newInventory.save();
        res.status(201).json('Inventory Item Added to the DB');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
