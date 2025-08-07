const CrudRouter = require('../services/crud_router.js');
const CrudQueryExecutor = require('../services/crud_query_executor.js');
const { Technology } = require('../models/technologies.js');
const { createTechnologyForm } = require('../forms/create_technology_form.js');
const CrudFileManager = require('../utils/crud_file_manager.js');
const mongoose = require('mongoose');

const queryExecutor = new CrudQueryExecutor(mongoose, Technology);
const fileManager = new CrudFileManager();

const technologiesRouter = new CrudRouter(
  queryExecutor,
  fileManager,
  { insertForm: createTechnologyForm }
);

module.exports = technologiesRouter;
