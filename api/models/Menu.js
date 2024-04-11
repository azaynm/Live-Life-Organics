import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name:{ 
        type: String
    },
    description:{
        type: String
    },
    quantity:{
        type: Number
    },
    category:{
        type:[String],
        enum: ["Appetizers", "Entrees", "SideDishes", "Salads", "Soups", "Desserts", "Beverages", "Specials"],
    },
    sellingPrice:{
        type: Number
    },
    image:{
        type: String
    }
});  

const Food = mongoose.model("Food", foodSchema);
export default Food;