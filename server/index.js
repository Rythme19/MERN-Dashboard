import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from './routers/users.router.js';
import aquastatsRouter from "./routers/aquastats.router.js";
import realtimeRouter from './routers/realtime.router.js';
import roleRouter from "./routers/role.router.js";




/* CONFIGURATION */
dotenv.config();
const app = express();
const port = process.env.PORT
const mongoUrl = process.env.MONGO_URL; 

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
app.use('/api/user', userRouter);
app.use('/api/role', roleRouter);
app.use('/api/aquastats',aquastatsRouter);
app.use('/api', realtimeRouter);


app.listen(port, () => {
  console.log("server is running");
});


