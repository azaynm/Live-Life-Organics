import express from "express";
import {config} from "dotenv";
import authRoutes from "./routes/auth.js";
import dbConnect from "./dbConnect.js";
import refreshTokenRoutes from "./routes/refreshToken.js"
import userRoutes from "./routes/users.js";
import imageRoutes from "./routes/images.js";
import cartRoutes from "./routes/cart.js";
import paymentRoutes from "./routes/payment.js";
import deliveryRoutes from "./routes/delivery.js";
import inventoryRoutes from "./routes/inventory.js";
import orderRoutes from "./routes/order.js";
import stripeRoutes from "./routes/stripeRoute.js";
import giftCardRoutes from "./routes/giftCard.js";
import cors from "cors";



const app = express();

//allows us access environment variables like dotenv files
config();

dbConnect();


//allows us get json object in request body
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);
app.use("/api", imageRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/gift-card", giftCardRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use('/api/stripe', stripeRoutes);





const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

