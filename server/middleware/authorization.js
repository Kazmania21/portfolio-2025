const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const Response = require('../response.js');

const SECRET_KEY = config.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  console.log(req.cookies);
  if (!req.cookies || !req.cookies.token) {
	const response = new Response(401, { errors: ['Unauthorized: No token given'] });
    return res.status(response.status).json(response.getResponse());
  }
  const token = req.cookies.token;
  

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach decoded token to request
    next(); // Proceed to the next middleware
  } catch (err) {
	const response = new Response(403, { errors: ['Invalid or expired token'] });
    return res.status(response.status).json(response.getResponse());
  }
};

module.exports = authMiddleware;
