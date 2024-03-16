import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    customerId: {
        type: String, // Reference to the customer ID
        required: true
    },
    food: {
        type: String, // Reference to the Food ID
        required: true
    },
    name:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String
    },
    quantity: {
        type: Number,
        default: 1 // Default quantity is 1
    },
    subTotal: {
        type: Number // Subtotal for this item (quantity * sellingPrice)
    },
    isConfirmed: {
        type: Boolean, // Subtotal for this item (quantity * sellingPrice)
        default: false
    }
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;