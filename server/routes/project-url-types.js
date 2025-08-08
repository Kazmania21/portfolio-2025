const CrudRouter = require('../services/crud-router.js');
const CrudQueryExecutor = require('../services/crud-query-executor.js');
const { ProjectUrlType } = require('../models/project-url-types.js');
const { createUrlTypeForm } = require('../forms/create-url-type-form.js');
const CrudFileManager = require('../utils/crud-file-manager.js');
const mongoose = require('mongoose');

const queryExecutor = new CrudQueryExecutor(mongoose, ProjectUrlType);
const fileManager = new CrudFileManager();

const projectUrlTypesRouter = new CrudRouter(
  queryExecutor,
  fileManager,
  { insertForm: createUrlTypeForm }
);

module.exports = projectUrlTypesRouter;
