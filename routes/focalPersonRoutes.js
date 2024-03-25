// routes/focalPersonRoutes.js
const express = require('express');
const focalPersonController = require('../controllers/focalPersonController');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.post('/register-focalperson', focalPersonController.register);
router.post('/login-focalperson', focalPersonController.login);
router.get('/profile', authenticate, focalPersonController.getFocalPersonProfile);
router.put('/profile', authenticate, focalPersonController.editFocalPerson);
router.post('/forgot-password', focalPersonController.forgotPassword);
router.post('/reset-password', focalPersonController.resetPassword);
module.exports = router;
 