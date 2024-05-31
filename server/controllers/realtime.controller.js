const Realtime = require('../models/realtime');

exports.sendTemperature = async (req, res) => {
  const { temperature } = req.body;

  try {
    // Assuming Realtime model has a method to send data to Node-RED
    await Realtime.sendTemperature(temperature);
    res.status(200).send('Temperature sent successfully');
  } catch (error) {
    console.error('Error sending temperature:', error);
    res.status(500).send('Internal Server Error');
  }
};
