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
    res.status(201).json({ message: "Review added successfully", review: reviewDocument });
  } catch (error) {
    console.error("Error adding review: ", error);
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};


module.exports = {
  addReviewForExpert
};
