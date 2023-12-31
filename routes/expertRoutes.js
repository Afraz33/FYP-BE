const {
  expertSignup,
  expertLogin,
  getAllUsers,
} = require("../controllers/expertController");
const {
  addReviewForExpert,
  createReview,
} = require("../controllers/reviewController");
const {
  createCalendar,
  updateCalendar,
} = require("../controllers/calendarController");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const expertRoutes = require("express").Router();
const ExpertModel = require("../models/expertModel");
const ReviewModel = require("../models/reviewModel");

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

// Sort experts by sentiment score
expertRoutes.get("/sort-by-sentiment/:field", async (req, res) => {
  try {
    const field = req.params.field;
    const experts = await ExpertModel.find({ expertise: field }).sort({
      sentimentScore: -1,
    });

    if (experts.length === 0) {
      // No experts found in the specified field
      return res
        .status(404)
        .json({ message: `No experts found in the field '${field}'` });
    }

    return res.status(200).json(experts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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
expertRoutes.get("/reviews/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const reviews = await ReviewModel.findOne({ expertEmail: email });
    if (reviews) {
      res.json(reviews.reviews);
    } else {
      res.json([]); // No reviews found for the given expert email
    }
  } catch (error) {
    console.error("Error fetching reviews :", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to add a review for an expert
expertRoutes.post("/add-review", addReviewForExpert);

// expertRoutes.get('/search', async (req, res) => {
//   const { query } = req.query;
//   try {
//     const experts = await ExpertModel.find({ expertise: new RegExp(query, 'i') });
//     res.json(experts);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
expertRoutes.put("/expert-updateCalendar", updateCalendar);

module.exports = expertRoutes;
