import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

// GET > users
router.get("/", async (req, res) => {
  const { username } = req.query;

  try {
    if (username) {
      const user = await getUserByUsername(username);
      return user
        ? res.status(200).json(user)
        : res.status(404).json({ error: "User not found" });
    }

    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET > users > id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    return user
      ? res.status(200).json(user)
      : res.status(404).json({ error: "User not found" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST > users
router.post("/", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ error: "Invalid user data" });
  }
});

// PUT > users > id
router.put("/:id", authenticate, async (req, res) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    return updated
      ? res.status(200).json(updated)
      : res.status(404).json({ error: "User not found" });
  } catch (error) {
    return res.status(400).json({ error: "Update failed" });
  }
});

// DELETE > users > id
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);
    return deleted
      ? res.status(200).json({ message: "User deleted" })
      : res.status(404).json({ error: "User not found" });
  } catch (error) {
    return res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
