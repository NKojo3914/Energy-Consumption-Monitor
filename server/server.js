const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 4000;

//app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/readings', auth, require('./routes/reading'));
app.use('/api/devices', auth, require('./routes/devices'));
app.use('/api/goals', auth, require('./routes/goals'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Energy Monitor Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
