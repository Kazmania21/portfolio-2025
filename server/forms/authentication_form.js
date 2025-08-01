const { body } = require('express-validator');
const { Form } = require("../form.js")

var authenticationForm = new Form([
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters long')
    .notEmpty()
    .withMessage('Username is required'),
  body('password')
    .isLength({ min:8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters long')
	.notEmpty()
    .withMessage('Password is required'),
])

module.exports = { authenticationForm }
