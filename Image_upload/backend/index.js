const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './uploads'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0],
    );
  },
});

const multi_upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .jpg .jpeg .png images are supported!');
      err.name = 'ExtensionError';
      return cb(err);
    }
  },
}).array('uploadImages', 10);

app.post('/api/upload', (req, res) => {
  multi_upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send({ error: { msg: `multer uploading error: ${err.message}` } }).end();
      return;
    } else if (err) {
      if (err.name === 'ExtensionError') {
        res.status(413).send({ error: { msg: `${err.message}` } }).end();
      } else {
        res.status(500).send({ error: { msg: `unknown uploading error: ${err.message}` } }).end();
      }
      return;
    }
    res.status(200).send('file uploaded');
  });
});

// Endpoint to get list of all uploaded images
app.get('/api/images', (req, res) => {
  fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
    if (err) {
      res.status(500).send({ error: { msg: 'Could not retrieve images' } });
      return;
    }
    // Send URLs of images
    const imageUrls = files.map(file => `http://localhost:${port}/uploads/${file}`);
    res.status(200).json({ images: imageUrls });
  });
});

app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));
