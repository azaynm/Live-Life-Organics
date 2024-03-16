import mongoose from "mongoose";
import Cart from "./Cart.js";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    foods: {
        type: [Cart.schema], // Assuming Cart.schema contains the schema definition
        default: []
    },
    amount:{
        type: Number
    },
    customer:{
        type: String
    },
    paymentId:{
        type: String
    },
    adminApproved:{
        type: Boolean
    },
    time: { type: Number, default: Date.now }
});  

const Order = mongoose.model("Order", orderSchema);
export default Order;