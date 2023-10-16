const userModel = require("../models/userModel");
const ExpertModel = require('../models/expertModel'); 
const jwt = require("jsonwebtoken");

//user signup
let signup = (req, res) => {
  let { password, email, gender, firstName, lastName, userName, phoneNo } =
    req.body;

  let user = new userModel({
    firstName,
    lastName,
    userName,
    email,
    password,
    gender,
    phoneNo,
  });

  user
    .save()
    .then((user) => {
      res.status(200).json({ Message: "User Created", user: user });
    })
    .catch((err) => {
      res.status(500).json({ Message: "User Not Created", err: err });
    });
};

//user login
let login = (req, res) => {
  let { email, password } = req.body;

  userModel
    .findOne({ email: email })
    .then((user) => {
      if (user.password == password) {
        let token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );
        res
          .status(200)
          .json({ Message: "Login Successfull", user: user, token });
      } else {
        res.status(500).json({ Message: "Login Failed" });
      }
    })
    .catch((err) => {
      res.status(500).json({ Message: "Login Failed", err: err });
    });
};


module.exports = {
  signup,
  login,
};
