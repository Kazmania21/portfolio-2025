const CrudRouter = require('../services/crud_router.js');
const CrudQueryExecutor = require('../services/crud_query_executor.js');
const { Project } = require('../models/projects.js');
const { createProjectForm } = require('../forms/create_project_form.js');
const { patchProjectForm } = require('../forms/patch_project_form.js');
const CrudFileManager = require('../utils/crud_file_manager.js');
const mongoose = require('mongoose');

const queryExecutor = new CrudQueryExecutor(mongoose, Project);
const fileManager = new CrudFileManager();

const projectsRouter = new CrudRouter(
  queryExecutor,
  fileManager,
  { 
    insertForm: createProjectForm,
    patchForm: patchProjectForm
  }
);

module.exports = projectsRouter;
