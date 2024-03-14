import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId, // Reference to the customer ID
        ref: 'User', // Reference to the Customer model
        required: true
    },
    food: {
        type: Schema.Types.ObjectId, // Reference to the Food ID
        ref: 'Food', // Reference to the Food model
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
    subtotal: {
        type: Number // Subtotal for this item (quantity * sellingPrice)
    },
    isConfirmed: {
        type: Boolean, // Subtotal for this item (quantity * sellingPrice)
        default: false
    }
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;