import express from "express";
import upload from "../middleware/upload.js";
import Event from "../models/Event.js";

const router = express.Router();

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const data = req.body;

    data.photo = req.file ? `/uploads/${req.file.filename}` : "";

    const event = new Event(data);
    await event.save();

    res.json({ message: "Event saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
