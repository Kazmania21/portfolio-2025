const express = require('express');
const ServerRoute = require('./routes/server_routes.js');
const AuthenticationServerRoute = require('./routes/authentication_server_routes.js');
const CrudQueryExecutor = require('./services/crud_query_executor.js');
const CrudFileManager = require('./utils/crud_file_manager.js');
const AuthenticationQueryExecutor = require('./services/authentication_query_executor.js');
const mongoose = require('mongoose');
const { TechnologyType } = require('./models/technology_types.js');
const { Technology } = require('./models/technologies.js');
const { ProjectUrlType } = require('./models/project_url_types.js');
const { ProjectUrl } = require('./models/project_urls.js');
const { Project } = require('./models/projects.js');
const { User } = require('./models/users.js');
const { Metadata } = require('./models/metadata.js');
const { createProjectForm } = require('./forms/create_project_form.js');
const { createTechnologyForm } = require('./forms/create_technology_form.js');
const { createUrlTypeForm } = require('./forms/create_url_type_form.js');
const { createTechnologyTypeForm } = require('./forms/create_technology_type_form.js');
const { authenticationForm } = require('./forms/authentication_form.js');
const csrfProtection = require('./middleware/csrf.js');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const config = require('./config/config');

const uri = config.MONGO_URI;
const isDev = config.IS_DEV;

// Database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

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

app.use(cookieParser());
app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

//console.log(createProjectForm);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fileManager = new CrudFileManager();

// auth routes
const authQueryExecutor = new AuthenticationQueryExecutor(mongoose, User);
const authServerRoute = new AuthenticationServerRoute(authQueryExecutor, authenticationForm);
app.use('/api', authServerRoute.router);

// CRUD query executors
const technologyTypeQueryExecutor = new CrudQueryExecutor(mongoose, TechnologyType);
const technologyQueryExecutor = new CrudQueryExecutor(mongoose, Technology);
const projectUrlTypeQueryExecutor = new CrudQueryExecutor(mongoose, ProjectUrlType);
const projectUrlQueryExecutor = new CrudQueryExecutor(mongoose, ProjectUrl);
const projectQueryExecutor = new CrudQueryExecutor(mongoose, Project);
const metadataQueryExecutor = new CrudQueryExecutor(mongoose, Metadata);

// CRUD route instances
const technologyTypesServerRoute = new ServerRoute(
  technologyTypeQueryExecutor,
  fileManager,
  { insertForm: createTechnologyTypeForm }
);

const technologiesServerRoute = new ServerRoute(
  technologyQueryExecutor,
  fileManager,
  { insertForm: createTechnologyForm }
);

const projectUrlTypesServerRoute = new ServerRoute(
  projectUrlTypeQueryExecutor,
  fileManager,
  { insertForm: createUrlTypeForm }
);

const projectUrlsServerRoute = new ServerRoute(
  projectUrlQueryExecutor,
  fileManager
);

const projectsServerRoute = new ServerRoute(
  projectQueryExecutor,
  fileManager,
  { insertForm: createProjectForm }
);

const metadataServerRoute = new ServerRoute(
  metadataQueryExecutor,
  fileManager
);

// CRUD route usage
app.use('/api/technology_types', technologyTypesServerRoute.router);
app.use('/api/technologies', technologiesServerRoute.router);
app.use('/api/project_url_types', projectUrlTypesServerRoute.router);
app.use('/api/project_urls', projectUrlsServerRoute.router);
app.use('/api/projects', projectsServerRoute.router);
app.use('/api/metadata', metadataServerRoute.router);

app.listen(3000, () => console.log('Server running on port 3000'));

