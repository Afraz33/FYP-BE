const axios = require('axios');
const mongoose = require("mongoose");

// ... [your schema and model definition]

async function getSentimentScore(reviews) {
  try {
    const response = await axios.post('http://127.0.0.1:5000/predict_sentiment', {
      reviews: reviews
    });
    
    return response.data.score;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Example usage:
const reviewsArray = ["Good service", "I didn't like it", "Awesome", "Not so good"];

getSentimentScore(reviewsArray)
  .then(score => {
    console.log("Sentiment Score:", score);
  })
  .catch(error => {
    console.error("Error:", error);
  });
