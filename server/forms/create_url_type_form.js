const { body } = require('express-validator');
const { Form } = require("../utils/form.js")

var createUrlTypeForm = new Form([
  body('name')
    .isLength({ min: 5, max: 50 })
    .withMessage('Name must be between 5 and 50 characters long')
    .notEmpty()
    .withMessage('Name is required'),
  /*body('imageFile')
    .notEmpty()
    .withMessage('Thumbnail image is required'),*/
])

module.exports = { createUrlTypeForm }
