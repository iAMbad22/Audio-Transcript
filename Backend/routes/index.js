const express = require('express');
const router = express.Router();
const transcriptRoutes = require('./transcriptRoutes');
const uploadRoutes = require('./uploadRoutes');

router.use('/transcripts', transcriptRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
