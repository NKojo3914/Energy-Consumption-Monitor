// Simple authentication middleware for Express
module.exports = function (req, res, next) {
  // Example: check for an Authorization header
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // In a real app, verify the token here
  // For demo, just allow if present
  next();
};
