import mongoose from "mongoose";

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    foodId:{
        type: Object
    },
    itemName:{
        type: String
    },
    quantity:{
        type: Number
    },
    category:{
        type:[String],
        enum: ["Produce", "Meat", "Beverages", "Utensils"],
    },
    supplier:{
        type: Object
    },
    cost:{
        type: Number
    },
    sellingPrice:{
        type: Number
    }
});  

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;