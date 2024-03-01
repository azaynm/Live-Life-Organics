import express from "express";
import {config} from "dotenv";
import authRoutes from "./routes/auth.js";
import dbConnect from "./dbConnect.js";
import refreshTokenRoutes from "./routes/refreshToken.js"
import userRoutes from "./routes/users.js";
import imageRoutes from "./routes/images.js";
import cartRoutes from "./routes/cart.js";
import paymentRoutes from "./routes/payment.js";
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



const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

