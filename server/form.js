const { validationResult } = require('express-validator');

class Form {
  constructor(validators) {
      this.validators = validators;
  }

  validate(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { message: "Form invalid", errors: errors.array() };
    }
    return { message: "Form Successfully Validated", errors: errors.array() };
  }
}

module.exports = { Form };

