const express = require('express');
const cors = require('cors');
require('dotenv').config();

const nasaRoutes = require('./routes/nasa');


const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['https://nasa-explorer-a4qo.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  }
};

app.use(cors(corsOptions));

// Use routes
app.use('/api', nasaRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
