const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { createClient } = require('@deepgram/sdk');
const Transcript = require('../models/Transcript');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

router.post('/', upload.single('audio'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const audioBuffer = fs.readFileSync(filePath);

    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      audioBuffer,
      {
        model: 'nova-2',
        smart_format: true,
      }
    );

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    fs.unlinkSync(filePath);

    const transcript = result.results.channels[0].alternatives[0].transcript;

    res.json({ data: { transcript: transcript } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
