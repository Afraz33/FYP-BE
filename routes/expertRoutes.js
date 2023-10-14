const { expertSignup } = require("../controllers/expertController");

const jwt = require("jsonwebtoken");

const expertRoutes = require("express").Router();

//Expert routes
expertRoutes.post("/expertSignup", expertSignup);

module.exports = expertRoutes;
