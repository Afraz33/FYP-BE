// routes/announcementRoutes.js
const express = require('express');
const announcementController = require('../controllers/announcementController');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.post('/create-announcement', authenticate, announcementController.createAnnouncement);
router.get('/all-announcements', announcementController.getAnnouncements);

module.exports = router;
