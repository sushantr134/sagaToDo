const express = require("express");
const router = express.Router();

const admin = require("../controllers/admin");

router.get("/adduser", admin.AddUser);

module.exports = router;
