const express = require('express');
const router = express.Router();
const songController = require('../controller/songController');
const multer = require('multer');
const path = require('path');

// Multer storage setup for handling file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Create unique filenames
    },
});

const upload = multer({ storage });

// Routes
router.get('/', songController.getSongs);  // Get all songs
router.get('/upload', songController.showUploadForm);  // Show upload form

// Update route to handle both the image and song file uploads
router.post('/upload', upload.fields([{ name: 'image_cover', maxCount: 1 }, { name: 'songFile', maxCount: 1 }]), songController.addSong);

router.get('/edit/:id', songController.getSongById);  // Get song by ID for editing
router.post('/edit/:id', upload.single('songFile'), songController.updateSong);  // Update song
router.post('/delete/:id', songController.deleteSong);  // Delete song

module.exports = router;
