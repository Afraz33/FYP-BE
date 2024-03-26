// models/FocalPerson.js
const mongoose = require('mongoose');

const focalPersonSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  universityEmail: { type: String, required: true, unique: true },
  universityName: { type: String, required: true, unique: true ,  trim: true, // Add trim option
},
  password: { type: String, required: true },
});

focalPersonSchema.pre('save', function(next) {
  this.universityName = this.universityName.toLowerCase();
  next();
});

const FocalPerson = mongoose.model('FocalPerson', focalPersonSchema);

module.exports = FocalPerson;
