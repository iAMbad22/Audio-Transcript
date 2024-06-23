const express = require('express');
const Transcript = require('../models/Transcript');

const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    const { transcript } = req.body;
    const newTranscript = new Transcript({ transcript });
    await newTranscript.save();
    res.json({ message: 'Transcript saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const transcripts = await Transcript.find();
    res.json(transcripts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
