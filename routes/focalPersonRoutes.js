// routes/focalPersonRoutes.js
const express = require('express');
const focalPersonController = require('../controllers/focalPersonController');

const router = express.Router();

router.post('/register-focalperson', focalPersonController.register);
router.post('/login-focalperson', focalPersonController.login);

module.exports = router;
