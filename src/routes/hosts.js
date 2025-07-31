import express from "express";
import {
  getAllHosts,
  getHostById,
  createHost,
  updateHost,
  deleteHost,
} from "../services/hostService.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

// GET > hosts 
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const hosts = name
      ? await getHostByName(name)
      : await getAllHosts();
    return res.status(200).json(hosts);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET > hosts > :id
router.get("/:id", async (req, res) => {
  try {
    const host = await getHostById(req.params.id);
    return host
      ? res.status(200).json(host)
      : res.status(404).json({ error: "Host not found" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST > hosts
router.post("/", authenticate, async (req, res) => {
  try {
    const newHost = await createHost(req.body);
    return res.status(201).json(newHost);
  } catch (error) {
    return res.status(400).json({ error: "Invalid host data" });
  }
});

// PUT > hosts > :id
router.put("/:id", authenticate, async (req, res) => {
  try {
    const updatedHost = await updateHost(req.params.id, req.body);
    return updatedHost
      ? res.status(200).json(updatedHost)
      : res.status(404).json({ error: "Host not found" });
  } catch (error) {
    return res.status(400).json({ error: "Update failed" });
  }
});

// DELETE > hosts > :id
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deleted = await deleteHost(req.params.id);
    return deleted
      ? res.status(200).json({ message: "Host deleted" })
      : res.status(404).json({ error: "Host not found" });
  } catch (error) {
    return res.status(500).json({ error: "Delete failed" });
  }
});

export default router;