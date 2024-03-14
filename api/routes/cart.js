import { Router } from "express";
import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Food from "../models/Food.js";
import User from "../models/User.js";

const router = Router();


router.post("/add-item", async (req, res) => {
    try {
        const { customerId, foodId, quantity, total } = req.body;

        // Fetch the food by its ID
        const food = await Food.findById(foodId);

        // Create a new cart item object
        const newItem = {
            customerId,
            food: food._id, // Assign the fetched food's ObjectId
            name: food.name,
            imageUrl: food.imageUrl,
            quantity,
            subtotal: total // Assuming total is the subtotal for this item
        };

        // Create a new cart instance
        const newCart = new Cart(newItem);

        // Save the new cart item to the database
        await newCart.save();

        res.json('Item added to the cart');
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// router.post("/add-item", async (req, res) => {

//     const userId = req.body.userId;
//     const foodId = req.body.foodId;
//     const foodName = req.body.foodName;
//     const foodImage = req.body.foodImage;
//     const quantity = req.body.quantity;
//     const total = req.body.total;


//     //res.secure_url

//     const newCartData = {
//         userId,
//         foodId,
//         foodName,
//         quantity,
//         foodImage,
//         total

//     }

//     const newCart = new Cart(newCartData);

//     newCart.save()
//         .then(() => res.json('Item Added to the Cart'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

router.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const cartItems = await Cart.find();
        
        const user = await User.findOne({ userName: id });

        const cartItem = cartItems.filter(e => String(e.customerId) === String(user._id) && e.isConfirmed === false);
        res.json(cartItem);
    } catch (error) {
        console.error("Error fetching cart items for user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/user/setConfirmed/:id", async (req, res) => {
    const id = req.params.id;
    
    const filter = { userId: id };
    const update = { isConfirmed: true };

    let doc = await Cart.updateMany(filter, update);

    res.json(doc);
});



router.get("/user/getTotal/:id", async (req, res) => {
    let sum = 0;
    const id = req.params.id;
    const cartItems = await Cart.find();
    const cartItem = cartItems.filter(e => e.userId == id );
    cartItem.forEach(e => {
        sum += parseFloat(e.total)
    })
    res.json(sum);
});

router.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const cartItems = await Cart.find();
    const cartItem = cartItems.filter(e => e.userId == id && e.isConfirmed == false);
    res.json(cartItem.length);
});

router.delete('/delete/:id', async (req, res) => {
    const result = await Cart.findByIdAndDelete(req.params.id)
    res.json(result)
})

router.get('/check/:id', async (req, res) => {
    const id = req.params.id;
    const cartItem = await Cart.findById(id);
    res.json(cartItem.image);
})


router.post('/:id', async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(req.params.id, {
        userId: req.body.userId,
        foodId: req.body.foodId,
        foodName: req.body.foodName,
        foodImage: req.body.foodImage,
        quantity: req.body.quantity,
        total: req.body.total,
    });


    res.json(cart);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const cartItems = await Cart.findById(id);

    res.json(cartItems)
})








export default router;