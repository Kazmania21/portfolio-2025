const CrudRouter = require('../services/crud_router.js');
const CrudQueryExecutor = require('../services/crud_query_executor.js');
const { Metadata } = require('../models/metadata.js');
const CrudFileManager = require('../utils/crud_file_manager.js');
const mongoose = require('mongoose');

const queryExecutor = new CrudQueryExecutor(mongoose, Metadata);
const fileManager = new CrudFileManager();

const metadataRouter = new CrudRouter(
  queryExecutor,
  fileManager
);

module.exports = metadataRouter;
