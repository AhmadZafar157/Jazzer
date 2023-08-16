const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (user) => {
  const secretKey = 'Ahmad_Zafar'; // Move to .env
  const expiresIn = '3h'; // Move to .env

  const payload = {
    userId: user.id,
    email: user.email,
    user_type: user.user_type
  };

  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

module.exports = generateToken;
