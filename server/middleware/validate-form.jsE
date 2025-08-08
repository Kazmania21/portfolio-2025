const Response = require('../utils/response.js');

const validateForm = (form, { isUpdating = false } = {}) => {
  return async (req, res, next) => {
    if (!form) {
      console.error('Form is undefined');
      const response = new Response(405, { 'errors': 'Method not allowed' });
      return res.status(response.status).json(response.getResponse());
    }
    console.log(req.body);
    const validation = await form.validate(req, { isUpdating: isUpdating });
    console.log(validation.errors);
    if (validation.errors) {
      return res.status(validation.status).json(validation.getResponse());
    }
    next();
  };
};

module.exports = validateForm;
