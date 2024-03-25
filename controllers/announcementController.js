// controllers/announcementController.js
const Announcement = require('../models/announcementsModel');

exports.createAnnouncement = async (req, res) => {
  try {
    console.log(req.user); // Add this to log the req.user object
    const { title, text } = req.body;
    console.log(req.user); // This should include universityName
    const universityName = req.user.universityName; // Make sure this is being set correctly

    const announcement = new Announcement({
      title,
      text,
      universityName,
    });

    await announcement.save();

    res.status(201).json({ message: 'Announcement created successfully' });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// controllers/announcementController.js

exports.editAnnouncement = async (req, res) => {
  try {
    const { title, text } = req.body; // You would get updated title and text from the request
    const { id } = req.params; // The ID of the announcement to update

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      { title, text },
      { new: true } // Return the updated document
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json({ message: 'Announcement updated successfully', updatedAnnouncement });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params; // The ID of the announcement to delete

    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
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

exports.getAnnouncementsByUniversity = async (req, res) => {
  try {
    const universityName = req.params.university;
    const announcements = await Announcement.find({ universityName: universityName });

    if(!announcements.length) {
      return res.status(404).json({ message: 'No announcements found for this university.' });
    }

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.fetchAnnouncements = async (req, res) => {
  try {
    const universityName = req.user.universityName;

    const announcements = await Announcement.find({ universityName });

    res.status(200).json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
