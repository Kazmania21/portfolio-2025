const express = require('express');
const ServerRoute = require('./server_routes.js');
const AuthenticationServerRoute = require('./authentication_server_routes.js');
const CrudQueryExecutor = require('./crud_query_executor.js');
const CrudFileManager = require('./crud_file_manager.js');
const AuthenticationQueryExecutor = require('./authentication_query_executor.js');
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
//const { body, validationResult } = require('express-validator');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const config = require('./config/config');

const SECRET_KEY = config.SECRET_KEY;

const uri = config.MONGO_URI;
const isDev = config.IS_DEV;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

const app = express();

app.use('/static', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));


app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": isDev ? ["'self'", "'unsafe-inline'"] : ["'self'"],
        "style-src": isDev ? ["'self'", "'unsafe-inline'"] : ["'self'"],
        "img-src": ["'self'", "data:"],
        "connect-src": isDev
          ? ["'self'", "http://localhost:5173", "ws://localhost:5173"]
          : ["'self'", "https://rojoware.com"],
      },
    },
  })
);

app.use(cookieParser());

//console.log(createProjectForm);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const file_manager = new CrudFileManager();

authentication_query_executor = new AuthenticationQueryExecutor(mongoose, User);
app.use('/api', new AuthenticationServerRoute(authentication_query_executor).router);

const technology_type_query_executor = new CrudQueryExecutor(mongoose, TechnologyType);
const technology_query_executor = new CrudQueryExecutor(mongoose, Technology);
const project_url_type_query_executor = new CrudQueryExecutor(mongoose, ProjectUrlType);
const project_url_query_executor = new CrudQueryExecutor(mongoose, ProjectUrl);
const project_query_executor = new CrudQueryExecutor(mongoose, Project);
const metadata_query_executor = new CrudQueryExecutor(mongoose, Metadata);

app.use('/api/technology_types', new ServerRoute(technology_type_query_executor, file_manager, insert_form=createTechnologyTypeForm).router);
app.use('/api/technologies', new ServerRoute(technology_query_executor, file_manager, insert_form=createTechnologyForm).router);
app.use('/api/project_url_types', new ServerRoute(project_url_type_query_executor, file_manager, insert_form=createUrlTypeForm).router);
app.use('/api/project_urls', new ServerRoute(project_query_executor, file_manager).router);
app.use('/api/projects', new ServerRoute(project_query_executor, file_manager, insert_form=createProjectForm).router);
app.use('/api/metadata', new ServerRoute(metadata_query_executor, file_manager).router);

app.listen(3000, () => console.log('Server running on port 3000'));

