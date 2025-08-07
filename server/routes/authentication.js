const AuthenticationRouter = require('../services/authentication_router.js');
const AuthenticationQueryExecutor = require('../services/authentication_query_executor.js');
const { User } = require('../models/users.js');
const { authenticationForm } = require('../forms/authentication_form.js');
const mongoose = require('mongoose');

const queryExecutor = new AuthenticationQueryExecutor(mongoose, User);
const authenticationRouter = new AuthenticationRouter(queryExecutor, authenticationForm);

module.exports = authenticationRouter;
