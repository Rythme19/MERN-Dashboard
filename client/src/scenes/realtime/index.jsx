import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { Box } from '@mui/material';

const Realtime = () => {
  const [temperature, setTemperature] = useState(0);
  const [pressure, setPressure] = useState(0);

  useEffect(() => {
    // Fetch initial data
    axios.get('/api/data')
      .then(response => {
        const { temperature, pressure } = response.data;
        setTemperature(temperature);
        setPressure(pressure);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // Set up WebSocket connection
    const socket = new WebSocket('ws://localhost:3001/ws');
    socket.onmessage = event => {
      const newData = JSON.parse(event.data);
      const { temperature, pressure } = newData;
      setTemperature(temperature);
      setPressure(pressure);
    };

    return () => socket.close();
  }, []);

  return (
    <Box display="flex" justifyContent="space-around" alignItems="center" height="100vh">
      <div className="progressbar">
        <h2>Temperature</h2>
        <CircularProgressbar value={temperature} text={`${temperature}°C`} />
      </div>
      <div className="progressbar">
        <h2>Pressure</h2>
        <CircularProgressbar value={pressure} text={`${pressure}Pa`} />
      </div>
    </Box>
  );
};

export default Realtime;
