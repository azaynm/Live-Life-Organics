import { Router } from "express";
import Payment from "../models/Payment.js";
import Pyment from "../models/Payment.js";

const router = Router();


router.get('/payments', async (req, res) => {
    const payments = await Payment.find();
    res.json(payments);
})

router.post("/add-order", async (req, res) => {

    const userId = req.body.userId;
    const name = req.body.name;
    const foodId = req.body.foodId;
    const cardNumber = req.body.cardNumber;
    const date = req.body.date;
    const cvv = req.body.cvv;
    const billingAddress = req.body.billingAddress;
    const zip = req.body.zip;
    const state = req.body.state;

    

    //res.secure_url

    const newOrderData = {
        userId,
        name,
        foodId,
        cardNumber,
        date,
        cvv,
        billingAddress,
        zip,
        state
    }

    const newOrder = new Payment(newOrderData);

    newOrder.save()
        .then(() => res.json('Item Added to the Cart'))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;