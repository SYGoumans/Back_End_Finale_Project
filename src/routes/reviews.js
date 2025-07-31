import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../services/reviewService.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

// GET  > reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await getAllReviews();
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Fetch reviews error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET > reviews > :id
router.get("/:id", async (req, res) => {
  try {
    const review = await getReviewById(req.params.id);
    return review
      ? res.status(200).json(review)
      : res.status(404).json({ error: "Review not found" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST > reviews
router.post("/", authenticate, async (req, res) => {
  try {
    const created = await createReview(req.body);
    return res.status(201).json(created);
  } catch (error) {
    return res.status(400).json({ error: "Invalid review data" });
  }
});

// PUT > reviews > :id
router.put("/:id", authenticate, async (req, res) => {
  try {
    const updated = await updateReview(req.params.id, req.body);
    return updated
      ? res.status(200).json(updated)
      : res.status(404).json({ error: "Review not found" });
  } catch (error) {
    return res.status(400).json({ error: "Update failed" });
  }
});

// DELETE > reviews > :id
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deleted = await deleteReview(req.params.id);
    return deleted
      ? res.status(200).json({ message: "Review deleted" })
      : res.status(404).json({ error: "Review not found" });
  } catch (error) {
    return res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
