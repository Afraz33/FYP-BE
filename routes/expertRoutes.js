const {
  expertSignup,
  expertLogin,
  getAllUsers,
} = require("../controllers/expertController");
const { createReview } = require("../controllers/reviewController");
const {
  createCalendar,
  updateCalendar,
} = require("../controllers/calendarController");
const jwt = require("jsonwebtoken");

const expertRoutes = require("express").Router();

//Expert routes
expertRoutes.post("/expertSignup", expertSignup, createReview, createCalendar);
expertRoutes.post("/expert-Login", expertLogin);
expertRoutes.put("/expert-updateCalendar", updateCalendar);
module.exports = expertRoutes;
