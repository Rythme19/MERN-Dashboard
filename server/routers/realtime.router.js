const express = require('express');
const realtimeController = require('../controllers/realtime.controller');

const router = express.Router();

router.post('/send-temperature', realtimeController.sendTemperature);

module.exports = router;
