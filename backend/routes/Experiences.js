const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Experience = require('../models/Experience');

// For Vercel deployment, we need to use memory storage instead of disk storage
// since Vercel serverless functions run in a read-only filesystem
const storage = multer.memoryStorage();

// Configure upload settings
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Helper function to generate a Base64 data URL from file buffer
const bufferToDataUrl = (buffer, mimetype) => {
  return `data:${mimetype};base64,${buffer.toString('base64')}`;
};

// GET all experiences
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ date: 1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET active experiences for customer landing page
router.get('/active', async (req, res) => {
  try {
    const experiences = await Experience.find({ isActive: true }).sort({ date: 1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single experience
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new experience
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl || '';
    
    // If a file was uploaded, create a data URL
    if (req.file) {
      imageUrl = bufferToDataUrl(req.file.buffer, req.file.mimetype);
    }
    
    const experience = new Experience({
      name: req.body.name,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      date: new Date(req.body.date),
      dayOfWeek: req.body.dayOfWeek,
      time: req.body.time,
      registrationFee: req.body.registrationFee,
      artistName: req.body.artistName,
      artistInstagramId: req.body.artistInstagramId,
      artistInstagramLink: req.body.artistInstagramLink,
      aboutArtist: req.body.aboutArtist,
      imageUrl: imageUrl,
      videoUrl: req.body.videoUrl,
      numberOfSeats: req.body.numberOfSeats,
      googleFormLink: req.body.googleFormLink,
      isActive: req.body.isActive === 'true'
    });

    const newExperience = await experience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update experience
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // If a new image is uploaded, create a data URL. Otherwise, keep the existing one.
    let imageUrl = req.body.imageUrl || experience.imageUrl;
    if (req.file) {
      imageUrl = bufferToDataUrl(req.file.buffer, req.file.mimetype);
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        date: new Date(req.body.date),
        dayOfWeek: req.body.dayOfWeek,
        time: req.body.time,
        registrationFee: req.body.registrationFee,
        artistName: req.body.artistName,
        artistInstagramId: req.body.artistInstagramId,
        artistInstagramLink: req.body.artistInstagramLink,
        aboutArtist: req.body.aboutArtist,
        imageUrl: imageUrl,
        videoUrl: req.body.videoUrl,
        numberOfSeats: req.body.numberOfSeats,
        googleFormLink: req.body.googleFormLink,
        isActive: req.body.isActive === 'true'
      },
      { new: true }
    );

    res.json(updatedExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update active status only
router.patch('/:id/status', async (req, res) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    );
    
    if (!updatedExperience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    res.json(updatedExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE experience
router.delete('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    // No need to delete physical files since we're using data URLs now
    
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;