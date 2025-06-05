const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

//app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Sample route
app.use('/api/readings', require('./routes/readings'));
app.use('/api/devices', require('./routes/devices'));
app.use('/api/goals', require('./routes/goals'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Energy Monitor Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
