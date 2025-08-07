const CrudRouter = require('../services/crud_router.js');
const CrudQueryExecutor = require('../services/crud_query_executor.js');
const { ProjectUrlType } = require('../models/project_url_types.js');
const { createUrlTypeForm } = require('../forms/create_url_type_form.js');
const CrudFileManager = require('../utils/crud_file_manager.js');
const mongoose = require('mongoose');

const queryExecutor = new CrudQueryExecutor(mongoose, ProjectUrlType);
const fileManager = new CrudFileManager();

const projectUrlTypesRouter = new CrudRouter(
  queryExecutor,
  fileManager,
  { insertForm: createUrlTypeForm }
);

module.exports = projectUrlTypesRouter;
