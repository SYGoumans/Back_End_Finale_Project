import express from "express";
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../services/propertyService.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

// GET > properties
router.get("/", async (req, res) => {
  try {
    const { location } = req.query;
    const properties = await getAllProperties(location);
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET > properties > :id
router.get("/:id", async (req, res) => {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST > properties
router.post("/", authenticate, async (req, res) => {
  try {
    const newProperty = await createProperty(req.body);
    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(400).json({ error: "Invalid property data" });
  }
});

// PUT > properties > :id
router.put("/:id", authenticate, async (req, res) => {
  try {
    const updated = await updateProperty(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(400).json({ error: "Update failed" });
  }
});

// DELETE > properties > :id
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deleted = await deleteProperty(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(404).json({ error: "Property not found" });
  }
});

export default router;
