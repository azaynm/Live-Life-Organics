import { Router } from "express";
import GiftCard from "../models/GiftCard.js";


const router = Router();


router.get('/gift-cards', async (req, res) => {
    const giftCards = await GiftCard.find();
    res.json(giftCards);
})

router.post("/add-gift-card", async (req, res) => {
        
    const customer = req.body.customer;
    const code = req.body.code;
    const category = req.body.category;
    const amount = req.body.amount;
    const issue_date = req.body.issue_date;
    const expire_date = req.body.expire_date;
    

    //res.secure_url

    const newGiftCardData = {
        customer,
        code,
        category,
        amount,
        issue_date,
        expire_date
    }

    const newGiftCard = new GiftCard(newGiftCardData);

    newGiftCard.save()
        .then(() => res.json('Gift Card Added to the DB'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/check-gift-card', async (req, res) => {
    try {
        const customer = req.query.customer; // Use req.query to access query parameters
        const code = req.query.code;

        const giftCards = await GiftCard.find({ customer, code });

        if (giftCards && giftCards.length > 0) {
            res.status(200).json(giftCards);
        } else {
            res.status(404).json({ error: 'No gift cards found for the provided customer and code.' });
        }
    } catch (error) {
        console.error('Error while checking gift card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;