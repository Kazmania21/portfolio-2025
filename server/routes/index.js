const express = require('express');
const router = express.Router();
const technologyTypesRouter = require('./technology_types.js');
const technologiesRouter = require('./technologies.js');
const projectUrlTypesRouter = require('./project_url_types.js');
const projectUrlsRouter = require('./project_urls.js');
const projectsRouter = require('./projects.js');
const metadataRouter = require('./metadata.js');
const authenticationRouter = require('./authentication.js');

router.use('/technology_types', technologyTypesRouter.router);
router.use('/technologies', technologiesRouter.router);
router.use('/project_url_types', projectUrlTypesRouter.router);
router.use('/project_urls', projectUrlsRouter.router);
router.use('/projects', projectsRouter.router);
router.use('/metadata', metadataRouter.router);
router.use('', authenticationRouter.router);

module.exports = router;
