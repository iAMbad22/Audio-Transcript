// server/index.js

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const { createClient } = require('@deepgram/sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const upload = multer({ dest: 'uploads/' });

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const TranscriptSchema = new mongoose.Schema({
  transcript: String,
});

const Transcript = mongoose.model('Transcript', TranscriptSchema);

app.post('/upload', upload.single('audio'), async (req, res) => {
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

app.post('/save', async (req, res) => {
  try {
    const { transcript } = req.body;
    const newTranscript = new Transcript({ transcript });
    await newTranscript.save();
    res.json({ message: 'Transcript saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/transcripts', async (req, res) => {
  try {
    const transcripts = await Transcript.find();
    res.json(transcripts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
