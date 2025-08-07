const { validationResult } = require('express-validator');
const Response = require('./response');

class Form {
  constructor(validators) {
    this.validators = validators;
  }

  async validate(req, { isUpdating = false } = {}) {
    // Optional setting is added to validators if updating and not inserting
    if (isUpdating) {
      await Promise.all(this.validators.map(validator => validator.optional().run(req)));
    }
    else {
      await Promise.all(this.validators.map(validator => validator.run(req)));
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return new Response(400, { message: 'Form invalid', errors: errorMessages });
    }
    return new Response(200, { message: 'Form Successfully Validated' });
  }
}

module.exports = { Form };

