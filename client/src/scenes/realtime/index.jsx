import React, { useState } from 'react';
import axios from 'axios';

const RealtimeTemperature = () => {
  const [temperature, setTemperature] = useState('');

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/realtime/send-temperature', { temperature });
      console.log('Temperature sent successfully');
    } catch (error) {
      console.error('Error sending temperature:', error);
    }
  };

  return (
    <div>
      <h2>Realtime Temperature</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Temperature:
          <input type="text" value={temperature} onChange={handleTemperatureChange} />
        </label>
        <button type="submit">Send Temperature</button>
      </form>
    </div>
  );
};

export default RealtimeTemperature;
