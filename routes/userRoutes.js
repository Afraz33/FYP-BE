const { signup, login, getExpertData } = require("../controllers/userController");

const jwt = require("jsonwebtoken");

const userRoutes = require("express").Router();
const ExpertModel = require("../models/expertModel")
//user routes
userRoutes.post("/signup", signup);
userRoutes.post("/login", login);

//middleware to decode user token
let DecodeUser = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (!err) {
      req.decoded = decoded;
      next();
    } else {
      res.status(403).json({ token: token, message: "Not Authorized" });
    } 
  });
};
module.exports = userRoutes;
