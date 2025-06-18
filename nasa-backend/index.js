const express = require('express');
const cors = require('cors');
require('dotenv').config();

const nasaRoutes = require('./routes/nasa');

const app = express();
const PORT = process.env.PORT || 5000;

// Use cors with specific origin
app.use(cors({
  origin: 'https://nasa-explorer-a4qo-nt3f2pn72-shanty-shabus-projects.vercel.app',
  credentials: true
}));

// Use routes
app.use('/api', nasaRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
