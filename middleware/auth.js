const jwt = require('jsonwebtoken');
const{User} = require('../models/user');



// Middleware to verify the JWT token and set user object on the request
const auth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Unauthorized');
  
    try {
      const decoded = jwt.verify(token, 'jwtPrivateKey');
      const user = await User.findById(decoded.user._id);
      req.user = user;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token');
    }
};

module.exports = auth;