const express = require('express');
const multer = require('multer');
const path = require('path');

// set multer storage
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

// Initilise upload
const upload = multer({
  storage: storage
}).single('upfile')

const app = express();

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/metadata', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {msg: "error uploading file"})
    } else {
      if (req.file === undefined) {
        res.render('index', {msg: "error no file selected"})
      } else {
        const data = { 
          name: req.file.originalname, 
          type: req.file.mimetype, 
          size: req.file.size 
        };
        res.render('index', { msg: "file uploaded", data });
      }
    }
  })
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
})