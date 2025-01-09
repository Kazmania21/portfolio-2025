const express = require('express');
const ServerRoute = require('./server_routes.js');
const mongoose = require('mongoose');
const { TechnologyType } = require('./models/technology_types.js');
const { Technology } = require('./models/technologies.js');
const { ProjectUrlType } = require('./models/project_url_types.js');
const { ProjectUrl } = require('./models/project_urls.js');
const { Project } = require('./models/projects.js');
//const { body, validationResult } = require('express-validator');
const cors = require('cors');

const uri = 'mongodb://localhost:27017/portfolio';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/technology_type', new ServerRoute(mongoose, TechnologyType).router);
app.use('/api/technologies', new ServerRoute(mongoose, Technology).router);
app.use('/api/project_url_types', new ServerRoute(mongoose, ProjectUrlType).router);
app.use('/api/project_urls', new ServerRoute(mongoose, ProjectUrl).router);
app.use('/api/projects', new ServerRoute(mongoose, Project).router);

app.listen(3000, () => console.log('Server running on port 3000'));

