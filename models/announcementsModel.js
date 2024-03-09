// models/Announcement.js
const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  universityName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
