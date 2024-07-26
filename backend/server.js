const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for your frontend
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
const formRoutes = require('./routes/formRoutes');
app.use('/api/form', formRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
