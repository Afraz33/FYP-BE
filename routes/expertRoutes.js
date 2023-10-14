const {
  expertSignup,
  expertLogin,
  getAllUsers,
} = require("../controllers/expertController");
const { createReview } = require("../controllers/reviewController");
const jwt = require("jsonwebtoken");

const expertRoutes = require("express").Router();

//Expert routes
expertRoutes.post("/expertSignup", expertSignup, createReview);
expertRoutes.post("/expert-Login", expertLogin);
module.exports = expertRoutes;
