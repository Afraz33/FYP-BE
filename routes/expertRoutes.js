const {
  expertSignup,
  expertLogin,
  getAllUsers,
} = require("../controllers/expertController");

const jwt = require("jsonwebtoken");

const expertRoutes = require("express").Router();

//Expert routes
expertRoutes.post("/expertSignup", expertSignup);
expertRoutes.post("/expert-Login", expertLogin);
module.exports = expertRoutes;
