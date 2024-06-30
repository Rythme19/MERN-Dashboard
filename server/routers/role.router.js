import express from 'express';
import { getRoles, addRole } from '../controllers/role.controller.js';

const router = express.Router();

router.get('/', getRoles);
router.post('/', addRole);


export default router;
