const { body } = require('express-validator');
const { Form } = require('../utils/form.js');

const createTechnologyForm = new Form([
  body('name')
    .isLength({ min: 5, max: 50 })
    .withMessage('Name must be between 5 and 50 characters long')
    .notEmpty()
    .withMessage('Name is required'),
  body('url')
    .isLength({ min:5, max: 255 })
    .withMessage('URL must be between 5 and 255 characters long')
    .notEmpty()
    .withMessage('URL is required'),
  body('type')
    .notEmpty()
    .withMessage('Technology type required')
]);

module.exports = { createTechnologyForm };
