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
  body('imageFile')
    .notEmpty()
    .withMessage('Thumbnail image is required'),
  body('technologies')
    .notEmpty()
    .withMessage('Technologies required'),
  body('urls')
    .notEmpty()
    .withMessage('Urls required'),
  body('tags')
    .notEmpty()
    .withMessage('Tags required')
])

module.exports = { createProjectForm }
