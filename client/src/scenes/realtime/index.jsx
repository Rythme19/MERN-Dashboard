import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Realtime = () => {
  const [temperature, setTemperature] = useState('');

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await axios.get('/api/realtime/get-temperature');
        setTemperature(response.data.temperature);
      } catch (error) {
        console.error('Error fetching temperature:', error);
      }
    };

    // Fetch temperature data every 5 seconds
    const interval = setInterval(fetchTemperature, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Realtime Temperature</h2>
      <p>Current Temperature: {temperature}</p>
    </div>
  );
};

export default Realtime;
