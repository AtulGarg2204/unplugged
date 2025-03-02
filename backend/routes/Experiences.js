const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Experience = require('../models/Experience');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

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
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
    
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

    // If a new image is uploaded, use that path. Otherwise, keep the existing one.
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : (req.body.imageUrl || experience.imageUrl);

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
    
    // Delete the associated image if it exists
    if (experience.imageUrl && experience.imageUrl.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', experience.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;