const { signup, login, forgotPassword, resetPassword, checkEmail, checkUsername, updateUserProfile, getUserProfile, getExpertData, DecodeUser } = require("../controllers/userController");

const jwt = require("jsonwebtoken");

const userRoutes = require("express").Router();
const ExpertModel = require("../models/expertModel")

//user routes
userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.post('/forgot-password', forgotPassword);
userRoutes.post('/reset-password', resetPassword);
userRoutes.post('/check-email', checkEmail); 
userRoutes.post('/check-username', checkUsername);
userRoutes.get('/user-profile', getUserProfile);
userRoutes.put('/user-profile',   updateUserProfile);

//middleware to decode user token

module.exports = userRoutes;
  