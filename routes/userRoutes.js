const { signup, login, getExpertData } = require("../controllers/userController");

const jwt = require("jsonwebtoken");

const userRoutes = require("express").Router();
const ExpertModel = require("../models/expertModel")
//user routes
userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
// userRoutes.get("/:id",
//   asyncHandler(async (req, res) => {
//     const expert = await ExpertModel.findById(req.params.id);
//     if (expert) {
//       res.json(expert);
//     } else {
//       res.status(404);
//       throw new Error("Expert not Found");
//     }
//   })
// );



//middleware to decode user token
let DecodeUser = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (!err) {
      req.decoded = decoded;
      next();
    } else {
      res.status(403).json({ token: token, message: "Not Authorized" });
    } 
  });
};
module.exports = userRoutes;
