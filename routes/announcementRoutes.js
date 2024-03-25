// routes/announcementRoutes.js
const express = require('express');
const announcementController = require('../controllers/announcementController');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

// Route to create a new announcement
router.post('/create-announcement', authenticate, announcementController.createAnnouncement);

// Route to edit an existing announcement by ID
router.put('/edit-announcements/:id', authenticate, announcementController.editAnnouncement);

// // Route to delete an existing announcement by ID
router.delete('/delete-announcements/:id', authenticate, announcementController.deleteAnnouncement);

// Route to get all announcements
router.get('/all-announcements', announcementController.getAnnouncements);

router.get('/announcement-card/:university', announcementController.getAnnouncementsByUniversity);

router.get('/fetch-announcements', authenticate, announcementController.fetchAnnouncements);
// // // Route to get announcements for a specific focal person (the authenticated user)
// router.get('/focalperson-announcements', authenticate, announcementController.getAnnouncements);

module.exports = router;
