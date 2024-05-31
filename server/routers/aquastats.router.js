import express from 'express';
import {getData} from '../controllers/aquastats.controller.js';

const aquastatsRouter = express.Router();

aquastatsRouter.get('/getData', getData);

export default aquastatsRouter;
