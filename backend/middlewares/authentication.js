
const jwt = require('jsonwebtoken');
const constant = require('../utils/globals');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, constant.SECRET_KEYS, (err, user) => {
    if (err) return res.sendStatus(403)

    req.user = user;
    next()
  });
}

module.exports = {
  authenticateToken
}
