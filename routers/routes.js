const express = require("express");
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const generator = require("../modals/card")

router.post('/generate', upload.single('logo'), (req, res) => {
  generator.generateCard(req, res, req.file);
});

router.get('/', (req, res) => {
  res.render("home.ejs")
});

module.exports = router;