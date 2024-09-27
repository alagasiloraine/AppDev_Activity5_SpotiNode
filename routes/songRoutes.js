const express = require('express');
const router = express.Router();
const songController = require('../controller/songController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage });

router.get('/', songController.getSongs);
router.get('/upload', songController.showUploadForm);

router.post('/upload', upload.fields([{ name: 'image_cover', maxCount: 1 }, { name: 'songFile', maxCount: 1 }]), songController.addSong);

router.get('/edit/:id', songController.getSongById); 
router.delete('/delete-song/:id', songController.deleteSong);
router.post('/edit/:id', upload.single('songFile'), songController.updateSong);
router.post('/delete/:id', songController.deleteSong);

module.exports = router;
