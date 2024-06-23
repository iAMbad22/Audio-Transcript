const mongoose = require('mongoose');

const TranscriptSchema = new mongoose.Schema({
  transcript: String,
});

const Transcript = mongoose.model('Transcript', TranscriptSchema);

module.exports = Transcript;
