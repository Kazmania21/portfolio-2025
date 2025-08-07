const CrudRouter = require('../services/crud_router.js');
const CrudQueryExecutor = require('../services/crud_query_executor.js');
const { TechnologyType } = require('../models/technology_types.js');
const { createTechnologyTypeForm } = require('../forms/create_technology_type_form.js');
const CrudFileManager = require('../utils/crud_file_manager.js');
const mongoose = require('mongoose');

const queryExecutor = new CrudQueryExecutor(mongoose, TechnologyType);
const fileManager = new CrudFileManager();

const technologyTypesRouter = new CrudRouter(
  queryExecutor,
  fileManager,
  { insertForm: createTechnologyTypeForm }
);

module.exports = technologyTypesRouter;
