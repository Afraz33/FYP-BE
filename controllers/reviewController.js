const Review = require("../models/reviewModel");

// Controller to add a review for an expert
const addReviewForExpert = async (req, res) => {
  const { expertEmail, userEmail, comment } = req.body;
  console.log("Request Body:", req.body);

  try {
    const reviewDocument = await Review.findOneAndUpdate(
      { expertEmail: expertEmail },
      { $push: { reviews: { userEmail: userEmail, comment: comment } } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log("Updated Document:", reviewDocument);
    res
      .status(201)
      .json({ message: "Review added successfully", review: reviewDocument });
  } catch (error) {
    console.error("Error adding review: ", error);
    res
      .status(500)
      .json({ message: "Failed to add review", error: error.message });
  }
};

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
      console.log(savedReview);
      // You can do something with the savedReview if needed
      // For example, you can send it as a response to the client
      //res.status(200).json({ Message: "Review Created", review: savedReview });
    })
    .catch((err) => {
      // Handle any errors that occur during the review creation
      res.status(500).json({ Message: "Review Not Created", err: err });
    });

  // Call the next middleware
};

module.exports = {
  addReviewForExpert,
  createReview,
};
