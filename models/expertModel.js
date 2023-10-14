const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  description: String,
  expertise: [String],
  highestQualification: String,
  skills: [String],
  experience: [String],
  currentRole: String,
  certifications: [String],
  city: String,
  languages: [String],
  hourlyRate: Number,
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  phone: String,
  gender: String,
  password: String,
});

const Expert = mongoose.model("experts", expertSchema);

module.exports = Expert;
