import { Router } from "express";
import Delivery from "../models/Delivery.js";


const router = Router();


router.get('/deliveries', async (req, res) => {
    const deliveries = await Delivery.find();
    res.json(deliveries);
})

router.post("/add-delivery", async (req, res) => {

    const orderID = req.body.orderID;
    const customerID = req.body.customerID;
    const deliveryAddress = req.body.deliveryAddress;
    const deliveryStatus = req.body.deliveryStatus;
    const deliveryPerson = req.body.deliveryPerson;
    const totalAmount = req.body.totalAmount;
    const deliveryCost = req.body.deliveryCost;
    const deliveryNote = req.body.deliveryNote;
    

    //res.secure_url

    const newDeliveryData = {
        orderID,
        customerID,
        deliveryAddress,
        deliveryStatus,
        deliveryPerson,
        totalAmount,
        deliveryCost,
        deliveryNote
    }

    const newDelivery = new Delivery(newDeliveryData);

    newDelivery.save()
        .then(() => res.json('Delivery Added to the DB'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/update-delivery/:deliveryID", async (req, res) => {
    const deliveryID = req.params.deliveryID; // Extract deliveryID from request parameters

    // Retrieve the new deliveryStatus from the request body
    const newDeliveryStatus = req.body.deliveryStatus;

    try {
        // Find the delivery by ID and update only the deliveryStatus field
        const updatedDelivery = await Delivery.findByIdAndUpdate(deliveryID, { deliveryStatus: newDeliveryStatus }, { new: true });

        if (!updatedDelivery) {
            return res.status(404).json({ message: "Delivery not found" });
        }

        res.json({ message: "Delivery status updated successfully", updatedDelivery });
    } catch (error) {
        res.status(400).json({ message: "Error updating delivery status", error: error.message });
    }
});

export default router;