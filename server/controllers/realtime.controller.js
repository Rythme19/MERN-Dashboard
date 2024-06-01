import dataModel from '../models/aquastats.js';

// Controller function to handle the incoming data
export const postRealtimeData = async (req, res) => {
    const { temperature, pressure } = req.body;

    if (!temperature || !pressure) {
        return res.status(400).json({ error: 'Temp and Pressure are required' });
    }

    try {
        const newData = new dataModel({ temperature, pressure, time ,date});
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
};
