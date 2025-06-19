const express = require('express');
const cors = require('cors');
require('dotenv').config();

const nasaRoutes = require('./routes/nasa');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://nasa-explorer-a4qo.vercel.app/'
}));

// Use routes
app.use('/api', nasaRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
