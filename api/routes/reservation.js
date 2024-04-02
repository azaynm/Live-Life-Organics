import { Router } from "express";
import Payment from "../models/Payment.js";
import Pyment from "../models/Payment.js";
import Reservation from "../models/Reservation.js";

const router = Router();

router.get('/reservations', async(req, res)=>{
  const reservations = await Reservation.find();
  res.json(reservations);
})

router.put('/reservation/:id', async (req, res) => {
  const reservationId = req.params.id;
  const { isApproved } = req.body;

  try {
    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { isApproved: isApproved },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json(reservation);
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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