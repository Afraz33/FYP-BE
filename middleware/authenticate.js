// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ error: 'You do not have permission to perform this action. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    // Check if the token is tampered
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'You have tampered with the token.' });
    }

    res.status(401).json({ error: 'Authentication failed' });
  }
};
