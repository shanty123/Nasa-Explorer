const express = require('express');
const cors = require('cors');
require('dotenv').config();

const nasaRoutes = require('./routes/nasa');

const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = [
  'https://nasa-explorer-a4qo-71dd8pn2p-shanty-shabus-projects.vercel.app',
  'http://localhost:5173'
];


app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Use routes
app.use('/api', nasaRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
