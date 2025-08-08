const { body } = require('express-validator');
const { Form } = require('../utils/form.js');

const createProjectForm = new Form([
  body('name')
    .isLength({ min: 5, max: 50 })
    .withMessage('Name must be between 5 and 50 characters long')
    .notEmpty()
    .withMessage('Name is required'),
  body('tagline')
    .isLength({ min:5, max: 255 })
    .withMessage('Tagline must be between 5 and 255 characters long'),
  body('technologies')
    .isArray({ max: 50 })
    .withMessage('Technologies must be an array'),
  body('technologies.*')
    .notEmpty()
    .withMessage('Each technology must have a value'),
  body('urls')
    .isArray({ max: 50 })
    .withMessage('Urls must be an array'),
  body('urls.*.url')
    .isLength({ min:5, max: 255 })
    .withMessage('Each URL must be between 5 and 255 characters long')
    .notEmpty()
    .withMessage('Each URL must have a value'),
  body('urls.*.type')
    .notEmpty()
    .withMessage('Each URL must have a type'),
  body('tags')
    .isArray({ max: 50 })
    .withMessage('Tags must be an array'),
  body('tags.*')
    .notEmpty()
    .withMessage('Each technology must have a value'),
]);

module.exports = { createProjectForm };
