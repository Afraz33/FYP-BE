// controllers/announcementController.js
const Announcement = require('../models/announcementsModel');

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, text } = req.body;
    const universityName = req.user.universityName; // Extracted from the JWT token

    const announcement = new Announcement({
      title,
      text,
      universityName,
    });

    await announcement.save();

    res.status(201).json({ message: 'Announcement created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ timestamp: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
