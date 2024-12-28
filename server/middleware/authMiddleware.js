import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, no hay token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

export default authMiddleware;
