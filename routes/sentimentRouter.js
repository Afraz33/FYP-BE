// THIS FILE IS NOT BEING USED

const express = require('express');
const axios = require('axios');
const Review = require('../models/reviewModel');
const Expert = require('../models/expertModel');


const router = express.Router();

router.get('/update_sentiments', async (req, res) => {
    try {
        // Fetch all review records from the database
        const allReviews = await Review.find();

        for (let review of allReviews) {
            // Get all comments for the current expert
            const comments = review.reviews.map(r => r.comment);
            
            // Send the comments to the Flask API
            const response = await axios.post('http://127.0.0.1:5000/predict_sentiment', {
                reviews: comments
            });

            const sentimentScore = response.data.score;
            
            // Update the sentiment score for the expert in the database
            await Expert.findOneAndUpdate(
                { email: review.expertEmail }, 
                { sentimentScore: sentimentScore }
            );
        }
        
        res.status(200).send('Sentiment scores updated successfully!');

    } catch (error) {
        console.error('Error updating sentiment scores:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;

