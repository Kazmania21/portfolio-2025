const CrudRouter = require('../services/crud-router.js');
const CrudQueryExecutor = require('../services/crud-query-executor.js');
const { TechnologyType } = require('../models/technology-types.js');
const { createTechnologyTypeForm } = require('../forms/create-technology-type-form.js');
const CrudFileManager = require('../utils/crud-file-manager.js');
const mongoose = require('mongoose');

const queryExecutor = new CrudQueryExecutor(mongoose, TechnologyType);
const fileManager = new CrudFileManager();

const technologyTypesRouter = new CrudRouter(
  queryExecutor,
  fileManager,
  { insertForm: createTechnologyTypeForm }
);

module.exports = technologyTypesRouter;
