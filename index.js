const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config;
const connectDB = require("./config/database");
const sentimentRouter= require("./routes/sentimentRouter");
const expertRouter = require("./routes/expertSentimentRouter");

connectDB();
const app = express();

const port = process.env.PORT || 5000;

var cors = require("cors");

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/experts", require("./routes/expertRoutes"));
app.use(sentimentRouter);
app.use('/experts', expertRouter);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
