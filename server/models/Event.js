import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  need: String,
  location: String,
  budget: String,
  about: String,
  photo: String,
}, {timestamps: true});

export default mongoose.model("Event", eventSchema);
