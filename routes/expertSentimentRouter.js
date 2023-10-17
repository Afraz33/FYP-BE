

const express = require('express');
const axios = require('axios');
const Expert = require('../models/expertModel');
const Review = require('../models/reviewModel');

const router = express.Router();

router.get('/updateSentimentScores', async (req, res) => {
    try {
        // Fetch all experts
        const experts = await Expert.find();

        for (let expert of experts) {
            // For each expert, get their reviews
            const reviewData = await Review.findOne({ expertEmail: expert.email });

            if (reviewData) {
                // Extract comments
                const comments = reviewData.reviews.map(r => r.comment);

                // Call your Flask API
                const response = await axios.post('http://127.0.0.1:5001/predict_sentiment', {
                    reviews: comments
                });

                const sentimentScore = response.data.score;

                // Update the expert's sentimentScore in MongoDB
                expert.sentimentScore = sentimentScore;
                await expert.save();
            }
        }

        res.json({ success: true, message: 'Sentiment scores updated successfully.' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred.', error: error.message });
    }
});

module.exports = router;
