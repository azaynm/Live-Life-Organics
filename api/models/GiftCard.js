import mongoose from "mongoose";

const Schema = mongoose.Schema;

const giftCardSchema = new Schema({
    customer:{
        type: String
    },
    code:{
        type: String
    },
    category:{
        type: String
    },
    amount:{
        type: Object
    },
    issue_date: { 
        type: Number, default: Date.now 
    },
    expire_date: {
        type: Number,
        default: function () {
            // Set default expire_date to one month after issue_date
            const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // Number of milliseconds in one month
            return this.issue_date + oneMonthInMillis;
        }
    }
    
});  

const GiftCard = mongoose.model("GiftCard", giftCardSchema);
export default GiftCard;