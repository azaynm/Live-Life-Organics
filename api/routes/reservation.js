import { Router } from "express";
import Payment from "../models/Payment.js";
import Pyment from "../models/Payment.js";
import Reservation from "../models/Reservation.js";

const router = Router();

router.get('/reservations', async(req, res)=>{
  const reservations = await Reservation.find();
  res.json(reservations);
})

router.get('/reservations/user/:userId', async(req, res)=>{
  const userId = req.params.userId;
  const reservations = await Reservation.find({username:userId});
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
      const { selectedDate, selectedTime, name, username, email, number, tableType, guestCount, fee, paymentId } = req.body;
      console.log("Payment id",paymentId);
      // Create a new reservation 
      const reservation = new Reservation({
        selectedDate,
        selectedTime,
        name,
        username,
        email,
        number,
        tableType,
        guestCount,
        fee,
        paymentId
      });
      console.log(reservation)
      await reservation.save();
  
      res.status(201).json({ message: 'Reservation created successfully' });
    } catch (error) {

      console.error('Error creating reservation:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  router.delete('/cancel-reservations/:id', async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      
      // Check if the reservation exists
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      // Check if the reservation is approved
      if (reservation.isApproved) {
        return res.status(403).json({ message: 'Cannot delete an approved reservation' });
      }
  
      // Delete the reservation if it's not approved
      await reservation.remove();
  
      return res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  


export default router;