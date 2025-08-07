const CrudRouter = require('../services/crud_router.js');
const CrudQueryExecutor = require('../services/crud_query_executor.js');
const { ProjectUrl } = require('../models/project_urls.js');
const CrudFileManager = require('../utils/crud_file_manager.js');
const mongoose = require('mongoose');

const queryExecutor = new CrudQueryExecutor(mongoose, ProjectUrl);
const fileManager = new CrudFileManager();

const projectUrlsRouter = new CrudRouter(
  queryExecutor,
  fileManager
);

module.exports = projectUrlsRouter;
