import express from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../services/bookingService.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

// GET > bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET > bookings > :id
router.get("/:id", async (req, res) => {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST > bookings
router.post("/", authenticate, async (req, res) => {
  try {
    const newBooking = await createBooking(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(400).json({ error: "Invalid booking data" });
  }
});

// PUT > bookings > :id
router.put("/:id", authenticate, async (req, res) => {
  try {
    const updated = await updateBooking(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(400).json({ error: "Update failed" });
  }
});

// DELETE > bookings > :id
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deleted = await deleteBooking(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(404).json({ error: "Booking not found" });
  }
});

export default router;
