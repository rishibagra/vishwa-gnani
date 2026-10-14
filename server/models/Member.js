import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { 
    type: String, 
    required: true,
    enum: ['President', 'Vice President', 'Secretary', 'Treasurer', 'Director', 'Member', 'Other']
  },
  image: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Member', memberSchema);