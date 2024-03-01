import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId:{
        type: String
    },
    foodId:{
        type: String
    },
    foodName:{
        type: String
    },
    foodImage:{
        type: String
    },
    quantity:{
        type: String
    },
    total:{
        type: String
    },
    isConfirmed:{
        type: Boolean,
        default: false
    },
});  

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;