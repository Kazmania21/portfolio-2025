const express = require('express');
const ServerRoute = require('./server_routes.js');
const mongoose = require('mongoose');
const { TechnologyType } = require('./models/technology_types.js');
const { Technology } = require('./models/technologies.js');
const { ProjectUrlType } = require('./models/project_url_types.js');
const { ProjectUrl } = require('./models/project_urls.js');
const { Project } = require('./models/projects.js');
const { User } = require('./models/users.js');
const { createProjectForm } = require('./forms/create_project_form.js');
const { createTechnologyForm } = require('./forms/create_technology_form.js');
const { createUrlTypeForm } = require('./forms/create_url_type_form.js');
const { createTechnologyTypeForm } = require('./forms/create_technology_type_form.js');
//const { body, validationResult } = require('express-validator');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const config = require('./config/config');

const SECRET_KEY = config.SECRET_KEY;

const uri = config.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

const app = express();

app.use('/static', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

//console.log(createProjectForm);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/sign_up', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/sign_in', async (req, res) => {
  //console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

	const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token: token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.use('/api/technology_types', new ServerRoute(mongoose, TechnologyType, insert_form=createTechnologyTypeForm).router);
app.use('/api/technologies', new ServerRoute(mongoose, Technology, insert_form=createTechnologyForm).router);
app.use('/api/project_url_types', new ServerRoute(mongoose, ProjectUrlType, insert_form=createUrlTypeForm).router);
app.use('/api/project_urls', new ServerRoute(mongoose, ProjectUrl).router);
app.use('/api/projects', new ServerRoute(mongoose, Project, insert_form=createProjectForm).router);

app.listen(3000, () => console.log('Server running on port 3000'));

