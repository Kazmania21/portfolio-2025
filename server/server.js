const express = require('express');
const mongoose = require('mongoose');
const csrfProtection = require('./middleware/csrf.js');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const config = require('./config/config.js');
const router = require('./routes/index.js');

const uri = config.MONGO_URI;
const isDev = config.IS_DEV;

// Database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

// App
const app = express();

// Uploads
app.use('/static', express.static(path.join(__dirname, 'uploads')));

// Log Traffic
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

// helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ['\'self\''],
        'script-src': isDev ? ['\'self\'', '\'unsafe-inline\''] : ['\'self\''],
        'style-src': isDev ? ['\'self\'', '\'unsafe-inline\''] : ['\'self\''],
        'img-src': ['\'self\'', 'data:'],
        'connect-src': isDev
          ? ['\'self\'', 'http://localhost:5173', 'ws://localhost:5173']
          : ['\'self\'', 'https://rojoware.com'],
      },
    },
  })
);

// Middleware
app.use(cookieParser());
app.use(csrfProtection);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/api', router);
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.listen(3000, () => console.log('Server running on port 3000'));

