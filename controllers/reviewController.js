const Review = require("../models/reviewModel"); // Import your Review model

const createReview = (req, res, next) => {
  // Retrieve the expert's email from the previous middleware (expertSignup)
  const expertEmail = req.body.email; // Assuming the email is in the request body

  // Create a review for the expert with no reviews initially
  const review = new Review({
    expertEmail,
    reviews: [],
  });

  review
    .save()
    .then((savedReview) => {
      // You can do something with the savedReview if needed
      // For example, you can send it as a response to the client
      //res.status(200).json({ Message: "Review Created", review: savedReview });
    })
    .catch((err) => {
      // Handle any errors that occur during the review creation
      res.status(500).json({ Message: "Review Not Created", err: err });
    });
  next();
  // Call the next middleware
};

module.exports = { createReview };
