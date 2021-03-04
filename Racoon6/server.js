const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send("API Running"));

// Define routes
app.use('/api/artists', require('./routes/api/artists'));
app.use('/api/fans', require('./routes/api/fans'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile/artist', require('./routes/api/artistProfile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));