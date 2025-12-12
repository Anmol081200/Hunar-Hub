import express from "express";
import upload from "../middleware/upload.js";
import Artist from "../models/artistModel.js";

const router = express.Router();

router.post(
  "/", 
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "gallery", maxCount: 20 }
  ]),
  async (req, res) => {
    try {
      const data = req.body;

      data.photo = req.files.photo
        ? `/uploads/${req.files.photo[0].filename}`
        : "";

      data.gallery = req.files.gallery
        ? req.files.gallery.map(f => `/uploads/${f.filename}`)
        : [];

      data.extraBudgets = JSON.parse(data.extraBudgets || "[]");

      const artist = new Artist(data);
      await artist.save();

      res.json({ message: "Artist saved successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
