const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  description: String,
  expertise: String,
  highestQualification: String,
  skills: [String],
  experience: [String],
  currentRole: String,
  certifications: [String],

  city: String,
  languages: [String],
  hourlyRate: String,
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    unique: true, // Make 'userName' field unique
  },
  email: {
    type: String,
    unique: true, // Make 'email' field unique
  },
  phone: String,
  gender: String,
  password: String,
  sentimentScore: Number,
  calendlyLink: {
    type: String,
    required: true, 
  },
});

const Expert = mongoose.model("experts", expertSchema);

module.exports = Expert;
