const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const router = require("./routers/routes");

dotenv.config({ path: ".env" });
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", router);

app.listen(PORT, function () {
  console.log("listening on port " + PORT);
});
