const { validationResult } = require('express-validator');
const Response = require('./response');

class Form {
  constructor(validators) {
      this.validators = validators;
  }

  async validate(req) {
    await Promise.all(this.validators.map(validator => validator.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new Response(400, { message: "Form invalid", errors: errors.array().map(error => error.msg) });
    }
    return new Response(200, { message: "Form Successfully Validated" });
  }
}

module.exports = { Form };

