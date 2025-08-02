const { body } = require('express-validator');
const { Form } = require("../form.js")

var createProjectForm = new Form([
  body('name')
    .isLength({ min: 5, max: 50 })
    .withMessage('Name must be between 5 and 50 characters long')
    .notEmpty()
    .withMessage('Name is required'),
  body('tagline')
    .isLength({ min:5, max: 255 })
    .withMessage('Tagline must be between 5 and 255 characters long'),
  /*body('imageFile')
    .notEmpty()
    .withMessage('Thumbnail image is required'),*/
  body('technologies')
    .isArray({ max: 50 })
    .withMessage('Technologies required'),
  body('technologies.*')
    .notEmpty()
    .withMessage('Each technology must have a value'),
  body('urls')
    .isArray({ max: 50 })
    .withMessage('Urls required'),
  body('urls.*.url')
    .notEmpty()
    .withMessage('Each URL must have a value'),
  body('urls.*.type')
    .notEmpty()
    .withMessage('Each URL must have a type'),
  body('tags')
    .isArray({ max: 50 })
    .withMessage('Tags required'),
  body('tags.*')
    .notEmpty()
    .withMessage('Each technology must have a value'),
])

module.exports = { createProjectForm }
