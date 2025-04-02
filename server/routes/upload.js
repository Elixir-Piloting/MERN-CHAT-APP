const express = require('express');
const upload = require('../middlewares/multer');
const router = express.Router();

// POST endpoint to handle image uploads
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    // `req.file.path` contains the URL of the uploaded image in Cloudinary
    res.json({ imageUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

module.exports = router;
