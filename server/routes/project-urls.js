const CrudRouter = require('../services/crud-router.js');
const CrudQueryExecutor = require('../services/crud-query-executor.js');
const { ProjectUrl } = require('../models/project-urls.js');
const CrudFileManager = require('../utils/crud-file-manager.js');
const mongoose = require('mongoose');

const queryExecutor = new CrudQueryExecutor(mongoose, ProjectUrl);
const fileManager = new CrudFileManager();

const projectUrlsRouter = new CrudRouter(
  queryExecutor,
  fileManager
);

module.exports = projectUrlsRouter;
