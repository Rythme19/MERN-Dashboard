import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from './routers/users.router.js';
import aquastatsRouter from "./routers/aquastats.router.js";

const bodyParser = require('body-parser');
const realtimeRouter = require('./routers/realtime.router');




/* CONFIGURATION */
dotenv.config();
const app = express();
const port = process.env.PORT// Use the PORT variable from .env, or default to 5000
const mongoUrl = process.env.MONGO_URL; // Use the MONGO_URL variable from .env

// Middleware
app.use(cors());
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



mongoose.connect("mongodb://127.0.0.1:27017/fermeaquacole");
/* ROUTES */
app.use('/api/users', userRouter);
app.use('/api/aquastats',aquastatsRouter);


//test jdid 


app.use(bodyParser.json());
app.use('/api/realtime', realtimeRouter);

//end


app.listen(port, () => {
  console.log("server is running");
});


