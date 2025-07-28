const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

const SECRET_KEY = config.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  console.log(req.cookies);
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).json({ error: 'Unauthorized: No token given' });
  }
  const token = req.cookies.token;
  

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach decoded token to request
    next(); // Proceed to the next middleware
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
