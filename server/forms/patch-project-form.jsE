const { body } = require('express-validator');
const { Form } = require('../utils/form.js');

const patchProjectForm = new Form([
  body('technologies')
    .isString()
    .withMessage('Technology must be a string'),
  body('urls')
    .isString()
    .withMessage('Url must be a string'),
  body('tags')
    .isString()
    .withMessage('Tag must be a string'),
]);

module.exports = { patchProjectForm };
