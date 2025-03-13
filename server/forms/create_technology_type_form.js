const { body } = require('express-validator');
const { Form } = require("../form.js")

var createTechnologyTypeForm = new Form([
  body('name')
    .isLength({ min: 5, max: 50 })
    .withMessage('Name must be between 5 and 50 characters long')
    .notEmpty()
    .withMessage('Name is required'),
  ])

module.exports = { createTechnologyTypeForm }
