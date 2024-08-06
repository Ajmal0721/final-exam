const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateJWT = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.redirect('/login');
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('Access denied');
    }
    next();
  };
};

module.exports = { authenticateJWT, authorizeRoles };
