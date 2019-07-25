const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(require("cors")());
app.use(require("helmet")());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(`index.html`);
});

app.listen(8000, err => {
  if (err) throw err;
  console.log("Server Running at 8000");
});
