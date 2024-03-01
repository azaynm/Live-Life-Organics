import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name:{
        type: String
    },
    price:{
        type: String
    },
    description:{
        type: String
    },
    image:{
        type: String
    }
});  

const Food = mongoose.model("Food", foodSchema);
export default Food;