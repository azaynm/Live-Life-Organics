import mongoose from "mongoose";

const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    deliveryID:{
        type: String
    },
    orderID:{
        type: Object
    },
    customerID:{
        type: Object
    },
    deliveryAddress:{
        type: String
    },
    deliveryStatus:{
        type:[String],
        enum: ["inProgress","onTheWay", "delivered", "cancelled"],
        default: ["inProgress"], // You can set any default role here
    },
    deliveryPerson:{
        type: Object
    },
    totalAmount:{
        type: String
    },
    deliveryCost:{
        type: String
    },
    deliveryNote:{
        type: String
    },
    time: { type: Number, default: Date.now }
});  

const Delivery = mongoose.model("Delivery", deliverySchema);
export default Delivery;