
import jwt from 'jsonwebtoken'
function authMiddleware(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('No token provided');
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send('Token error');
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send('Token malformed');
  }

  jwt.verify(token,'mysecretkey', (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send('Token invalid');
    }
    req.userId = decoded.id;
    next();
  });
}

export default authMiddleware
