import Realtime from '../models/realtime.js';

export const receiveTemperature = (req, res) => {
  const { temperature } = req.body;

  try {
    console.log(`Received temperature: ${temperature}`);
    // Save the temperature data
    Realtime.setTemperature(temperature);
    res.status(200).send('Temperature received successfully');
  } catch (error) {
    console.error('Error receiving temperature:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getTemperature = (req, res) => {
  try {
    const temperature = Realtime.getTemperature();
    if (temperature !== null) {
      res.status(200).json({ temperature });
    } else {
      res.status(404).send('Temperature not set');
    }
  } catch (error) {
    console.error('Error getting temperature:', error);
    res.status(500).send('Internal Server Error');
  }
};
