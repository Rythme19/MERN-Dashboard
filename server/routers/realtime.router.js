import express from 'express';
import { receiveTemperature, getTemperature } from '../controllers/realtime.controller.js';

const router = express.Router();

router.post('/receive-temperature', receiveTemperature);
router.get('/get-temperature', getTemperature);

export default router;
