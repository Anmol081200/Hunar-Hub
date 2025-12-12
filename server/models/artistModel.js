import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    location: String,
    budget: String,

    photoshoot: String,
    videoshoot: String,
    withEditing: String,

    about: String,
    photo: String,        // profile pic
    gallery: [String],    // array of URLs

    extraBudgets: Array   // dynamic budgets
  },
  { timestamps: true }     // <-- IMPORTANT
);

export default mongoose.model("Artist", artistSchema);
