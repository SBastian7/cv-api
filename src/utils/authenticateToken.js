const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!(token || token?.startsWith('Bearer '))) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const authToken = token.split(' ')[1];

  // Replace 'YOUR_SECRET_KEY' with your actual JWT secret key used to sign the token
  jwt.verify(authToken, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Optionally, you can attach the authenticated user to the request for further processing in routes
    req.user = user;

    next();
  });
};

module.exports = authenticateToken;
