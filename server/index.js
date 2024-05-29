import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userController from "./controllers/user.controller.js";
import dataController from "./controllers/data.controller.js";



//import managementRoutes from './routes/management.js';

/* CONFIGURATION */
dotenv.config();
const app = express();
const port = process.env.PORT // Use the PORT variable from .env, or default to 5000
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
app.use(userController);

app.use(dataController);

// //websocket 

// import http from 'http';
// import WebSocket from 'ws';

// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });


// app.get('/api/data', (req, res) => {
//   // Route to get data from Node-RED if needed
//   // This route can be used by Node-RED to send data to the server
// });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', (data) => {
//     console.log('Received message from client:', data);
//     // Process messages received from clients if needed
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// // WebSocket endpoint to receive data from Node-RED
// app.post('/api/node-red', (req, res) => {
//   const { temperature, pressure } = req.body;
  
//   // Broadcast the received data to all connected clients
//   wss.clients.forEach(client => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify({ temperature, pressure }));
//     }
//   });

//   res.sendStatus(200);
// });

// //end

app.listen(port, () => {
  console.log("server is running");
});



