const mongoose = require("mongoose");

// Define the schema
const reviewSchema = new mongoose.Schema({
  expertEmail: {
    type: String,
    required: true,
  },

  reviews: [
    {
      userEmail: {
        type: String,
      },
      comment: {
        type: String,
      },
      // You can add more fields related to the review here
    },
  ],
});

// Create a model
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
