const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// अपलोड फोल्डर बनाएं अगर नहीं है
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// multer सेटअप: इमेज अपलोड के लिए
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName); // यूनिक फाइलनेम
  }
});
const upload = multer({ storage });

// स्टेटिक फाइल्स सर्व करें (HTML, CSS, JS और अपलोड्स)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(uploadDir));

// अपलोड रूट
app.post('/upload', upload.single('wallpaper'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('कोई इमेज नहीं अपलोड की गई।');
  }
  // हैश-बेस्ड पाथ: क्लाइंट को #image-id के साथ रीडायरेक्ट करें
  const imageId = req.file.filename.split('.')[0]; // सिंपल ID
  res.json({ message: 'अपलोड सफल!', url: `/wallpaper/#${imageId}` });
});

// सर्वर स्टार्ट
app.listen(port, () => {
  console.log(`सर्वर चल रहा है: http://localhost:${port}`);
});
