import { Router } from "express";
import Feedback from "../models/Feedback.js";
import Order from "../models/Order.js";


const router = Router();

router.get("/feedbacks", async (req, res) => {
    try {
      // Find all feedbacks
      const feedbacks = await Feedback.find();
      // Return the feedbacks as JSON response
      return res.json(feedbacks);
    } catch (error) {
      // If an error occurs, handle it
      console.error("Error fetching feedbacks:", error);
      return res.status(500).json({ error: "Failed to fetch feedbacks" });
    }
  });

  
router.post("/submit-feedback", async (req, res) => {
    try {
      const { deliveryRating, foodRating, orderId, customer, note } = req.body;
  
      // Find the order by its ID
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Access deliveryStaff and cheff from the order object
      const { deliveryStaff, cheff } = order;
  
      // Create a new Feedback document
      const feedback = new Feedback({
        deliveryRating,
        foodRating,
        orderId,
        customer,
        note,
        deliveryStaff,
        cheff
      });
  
      // Save the feedback to the database
      await feedback.save();
  
      res.status(201).json({ message: "Feedback submitted successfully" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(500).json({ error: "Failed to submit feedback" });
    }
  });
  

  export default router;