import express from 'express';
import { upload, uploadToCloudinary } from '../cloudinary.js';
import Member from '../models/Member.js';
import Program from '../models/Program.js';
import Event from '../models/Event.js';
import User from '../models/User.js'; // Import User model

const router = express.Router();

// --- DYNAMIC ADMIN VERIFICATION MIDDLEWARE ---
const verifyAdmin = async (req, res, next) => {
  try {
    // Read the email passed from frontend headers
    const adminEmail = req.headers['x-admin-email'] || req.body.adminEmail;

    if (!adminEmail) {
      return res.status(401).json({ message: 'Authentication email missing' });
    }

    // Find user in database dynamically
    const user = await User.findOne({ email: adminEmail });

    // Allow access if user exists and has role: "admin"
    if (user && user.role === 'admin') {
      req.user = user;
      return next();
    }

    return res.status(403).json({ message: 'Access denied. Requires admin role.' });
  } catch (error) {
    console.error('Admin verification error:', error);
    res.status(500).json({ message: 'Server error during authorization' });
  }
};

// --- PROGRAM ROUTES ---

router.get('/programs', async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.status(200).json(programs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

router.post('/admin/program', verifyAdmin, async (req, res) => {
  try {
    const { title, description, category, date } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newProgram = new Program({
      title,
      description,
      category: category || 'program',
      date
    });

    await newProgram.save();
    res.status(201).json({ message: 'Program added successfully!', program: newProgram });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add program' });
  }
});

// --- MEMBER ROUTES ---

router.post(['/admin/member', '/member'], verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, role, imageUrl } = req.body;
    let memberImage = imageUrl;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'vishwa-gnani-uploads');
      memberImage = result.secure_url;
    }

    if (!name || !role) {
      return res.status(400).json({ message: 'Name and role are required' });
    }

    const newMember = await Member.create({ 
      name, 
      role, 
      image: memberImage 
    });

    res.status(201).json({ message: 'Member added successfully', member: newMember });
  } catch (error) {
    console.error('Error saving member:', error);
    res.status(500).json({ message: 'Server error saving member' });
  }
});

router.get(['/admin/members', '/members'], async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching members' });
  }
});

router.delete(['/admin/member/:id', '/member/:id'], verifyAdmin, async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Member removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting member' });
  }
});

// --- EVENT ROUTES ---

router.get(['/admin/events', '/events'], async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error fetching events' });
  }
});

router.post(
  ['/admin/event', '/event'], 
  verifyAdmin,
  upload.array('images', 10),
  async (req, res) => {
    try {
      const { title, date, description, mainImage, galleryUrls } = req.body;

      if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
      }

      let uploadedImageUrls = [];

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await uploadToCloudinary(file.buffer, 'vishwa-gnani-events');
          uploadedImageUrls.push(result.secure_url);
        }
      } else if (galleryUrls) {
        uploadedImageUrls = Array.isArray(galleryUrls) ? galleryUrls : JSON.parse(galleryUrls);
      }

      const coverPhoto = uploadedImageUrls[0] || mainImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop';

      const newEvent = await Event.create({
        title,
        date: date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        description,
        mainImage: coverPhoto,
        images: uploadedImageUrls.length > 0 ? uploadedImageUrls : [coverPhoto]
      });

      res.status(201).json({ message: 'Event added successfully!', event: newEvent });
    } catch (error) {
      console.error('❌ DETAILED EVENT ERROR:', error.message);
      res.status(500).json({ message: error.message || 'Server error saving event' });
    }
  }
);

// REORDER EVENT GALLERY IMAGES ROUTE (PROTECTED BY DYNAMIC ADMIN VERIFICATION)
router.put(
  ['/admin/event/:id/reorder', '/event/:id/reorder'],
  verifyAdmin,
  async (req, res) => {
    try {
      const { images } = req.body;
      if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ message: 'Images array is required' });
      }

      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        { 
          images: images,
          mainImage: images[0] 
        },
        { new: true }
      );

      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }

      res.status(200).json({ message: 'Gallery sequence updated successfully', event: updatedEvent });
    } catch (error) {
      console.error('Error reordering images:', error);
      res.status(500).json({ message: 'Server error reordering images' });
    }
  }
);

// DELETE EVENT ROUTE (PROTECTED BY DYNAMIC ADMIN VERIFICATION)
router.delete(
  ['/admin/event/:id', '/event/:id'],
  verifyAdmin,
  async (req, res) => {
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ message: 'Server error deleting event' });
    }
  }
);

// --- NEW ENDPOINT: PROMOTE USER TO ADMIN (AUTO-CREATE IF NOT EXISTS) ---
router.put('/admin/make-admin', verifyAdmin, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'User email is required' });
    }

    let updatedUser = await User.findOne({ email: email });

    if (!updatedUser) {
      // Automatically create user and grant admin role if not registered yet
      updatedUser = await User.create({
        email: email,
        name: email.split('@')[0],
        role: 'admin',
        password: '$2b$10$temporaryplaceholderpasswordhash'
      });
      return res.status(200).json({ message: `Success! Created account and promoted ${email} to Admin.` });
    }

    updatedUser.role = 'admin';
    await updatedUser.save();

    res.status(200).json({ message: `Success! ${email} has been promoted to Admin.` });
  } catch (error) {
    console.error('Error promoting user:', error);
    res.status(500).json({ message: 'Server error promoting user' });
  }
});

export default router;