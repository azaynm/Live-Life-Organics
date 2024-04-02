import { Router } from "express";
import Payment from "../models/Payment.js";
import Pyment from "../models/Payment.js";
import Reservation from "../models/Reservation.js";

const router = Router();

router.post('/reservations', async (req, res) => {
    try {
      
      // Extract data from request body
      const { selectedDate, selectedTime, name, username, email, number, tableType, guestCount } = req.body;
  
      // Create a new reservation 
      const reservation = new Reservation({
        selectedDate,
        selectedTime,
        name,
        username,
        email,
        number,
        tableType,
        guestCount
      });
      console.log(reservation)
      await reservation.save();
  
      res.status(201).json({ message: 'Reservation created successfully' });
    } catch (error) {

      console.error('Error creating reservation:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  


export default router;