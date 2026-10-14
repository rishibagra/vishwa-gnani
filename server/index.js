import 'dotenv/config'; // <--- Yeh sabse pehli line honi chahiye!
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

// Import Routes
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/authRoutes.js';
import User from './models/User.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ... baaki ka code waisa hi rahega



// Middleware
app.use(cors());
app.use(express.json());

// FIXED: Serve uploaded files correctly from current directory's 'uploads' folder
app.use('/uploads', express.static(path.join(process.cwd(), 'server', 'uploads')));
// Connect to MongoDB and Seed Admin User
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vishwa-gnani')
  .then(async () => {
    console.log('MongoDB Connected Successfully to vishwa-gnani');

    try {
      const adminEmail = 'admin@vishwagnani.org';
      const rawPassword = 'adminpassword123';

      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      await User.findOneAndUpdate(
        { email: adminEmail },
        { 
          email: adminEmail, 
          password: hashedPassword, 
          isAdmin: true,
          name: 'Admin'
        },
        { upsert: true, new: true }
      );

      console.log('----------------------------------------------------');
      console.log('ADMIN USER READY!');
      console.log(`Email:    ${adminEmail}`);
      console.log(`Password: ${rawPassword}`);
      console.log('----------------------------------------------------');
    } catch (err) {
      console.error('Failed to seed admin user:', err);
    }
  })
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Mount Routes
app.use('/api', adminRoutes);
app.use('/api/auth', authRoutes);

// Default Root Route
app.get('/', (req, res) => {
  res.send('Vishwa Gnani Trust API is running...');
});

export default app;

// Vercel invokes the exported Express app as a serverless function.
// Keep listen() for local development and traditional Node hosting.
if (!process.env.VERCEL) {
  const PORT = Number(process.env.PORT) || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}