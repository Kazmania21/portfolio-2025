const { body } = require('express-validator');
const { Form } = require("../form.js")

var createProjectForm = new Form([
  body('name')
    .isLength({ min: 5, max: 50 })
    .withMessage('Name must be betweeb 5 and 50 characters long')
    .notEmpty()
    .withMessage('Name is required'),
  body('tagline')
    .isLength({ min:5, max: 255 })
    .withMessage('Tagline must be betweeb 5 and 50 characters long'),
  body('imageFile')
    .notEmpty()
    .withMessage('Thumbnail image is required'),
  body('technologies')
    .notEmpty()
    .withMessage('Technologies required'),
  body('urls')
    .notEmpty()
    .withMessage('Urls required')
])

module.exports = { createProjectForm }
