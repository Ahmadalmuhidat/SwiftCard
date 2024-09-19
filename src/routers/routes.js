const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const CardGenerator = require("../controllers/CardController");
const info = require("../middlewares/InfoValidator")

router.post('/generate', info, upload.single('logo'), (req, res) => {
  CardGenerator.CardController(req, res, req.file);
});

router.get('/', (req, res) => {
  res.render("home.ejs")
});

module.exports = router;