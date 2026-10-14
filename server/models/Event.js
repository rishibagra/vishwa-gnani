import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  mainImage: { type: String },
  images: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);