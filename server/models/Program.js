import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'program' }, // 'program' or 'past-work'
  date: { type: String }
}, { timestamps: true });

export default mongoose.model('Program', programSchema);