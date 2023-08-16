const jwt = require('jsonwebtoken');
var token = '';
const authMiddleware = (req, res, next) => {
  // Check if the request path is login or signup
  if (req.path === '/signup' || req.path === '/login') {
    return next(); // Skip authentication for these routes
  }
  // Get the token from the request headers, cookies, or wherever it is stored
  try {
    token = req.headers.authorization;
    token = token ? token.split(" ")[1] : null;
  } catch (err) {
    console.log(err);
    return res.status(401).json({ "error": "The token is not available in header !" })
  }

  // Verify and decode the token
  jwt.verify(token, 'Ahmad_Zafar', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Extract the user ID from the decoded token
    const userId = decoded.userId;
    // Store the user ID in the request object for future use
    req.userId = userId;

    next(); // Call the next middleware or route handler
  });
};

module.exports = authMiddleware;
