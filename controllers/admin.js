const User = require("../models/user");
const bcrypt = require("bcryptjs");

require("dotenv").config();

exports.AddUser = (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(`${process.env.SECRET_KEY}password@123`, salt, (err, hash) => {
      User.create({
        name: "Sushant Singh",
        email: "xyz@gmail.com",
        password: hash
      })
        .then(() => {
          res.send("<h1>User Created Successfully</h1>");
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
};
