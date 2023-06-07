// const jwt = require('jsonwebtoken');

// function authMiddleware(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).send('No token provided');
//   }

//   const parts = authHeader.split(' ');
//   if (parts.length !== 2) {
//     return res.status(401).send('Token error');
//   }

//   const [scheme, token] = parts;
//   if (!/^Bearer$/i.test(scheme)) {
//     return res.status(401).send('Token malformed');
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).send('Token invalid');
//     }
//     req.userId = decoded.id;
//     next();
//   });
// }

// module.exports = authMiddleware;
