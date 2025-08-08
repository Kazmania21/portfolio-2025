const { body } = require('express-validator');
const { Form } = require('../utils/form.js');

const patchProjectForm = new Form([
  body('technologies')
    .isString()
    .withMessage('Technology must be a string'),
  body('urls.*.url')
    .isString()
    .withMessage('Url must be a string')
    .isLength({ min:5, max: 255 })
    .withMessage('URL must be between 5 and 255 characters long'),
  body('tags')
    .isString()
    .withMessage('Tag must be a string'),
]);

module.exports = { patchProjectForm };
