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
    },
  ],
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
