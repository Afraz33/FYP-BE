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
const asyncHandler = require("express-async-handler");
const expertRoutes = require("express").Router();
const ExpertModel = require("../models/expertModel");

//Expert routes
expertRoutes.post("/expertSignup", expertSignup, createReview, createCalendar);
expertRoutes.post("/expert-Login", expertLogin);

expertRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const experts = await ExpertModel.find({}); // Fetch all experts

    res.json(experts); // Send the experts as a JSON response
  })
);

expertRoutes.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const expert = await ExpertModel.findById(req.params.id);
    if (expert) {
      res.json(expert);
    } else {
      res.status(404);
      throw new Error("Expert not Found");
    }
  })
);

expertRoutes.put("/expert-updateCalendar", updateCalendar);

module.exports = expertRoutes;
