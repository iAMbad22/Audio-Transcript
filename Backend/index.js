const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
