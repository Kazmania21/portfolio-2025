const validateForm = (form) => {
  return async (req, res, next) => {
    console.log(req.body);
    const validation = await form.validate(req);
    console.log(validation.errors);
    if (validation.errors) {
      return res.status(validation.status).json(validation.getResponse());
    }
    next();
  }
}

module.exports = validateForm;
