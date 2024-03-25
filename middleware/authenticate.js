const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization');

    // Log the token value
    console.log('Token:', token);
  
  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ error: 'You do not have permission to perform this action. Token is missing.' });
  }
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);

    // Log the decoded token payload
    console.log('Decoded Token Payload:', decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error); // Log any authentication errors
    // Check if the token is tampered
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'You have tampered with the token.' });
    }

    res.status(401).json({ error: 'Authentication failed' });
  }
};
// exports.authenticate = (req, res, next) => {
//   const token = req.header('Authorization');
//   console.log('Token:', token); // This should log the token

//   if (!token) {
//     return res.status(401).json({ error: 'Token is missing.' });
//   }
  
//   try {
//     const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
//     console.log('Decoded Token Payload:', decoded); // This should include universityName

//     if (!decoded.universityName) {
//       throw new Error('universityName is missing in token payload.');
//     }

//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error('Authentication error:', error.message); // Modified to log the message
//     return res.status(401).json({ error: error.message });
//   }
// };
