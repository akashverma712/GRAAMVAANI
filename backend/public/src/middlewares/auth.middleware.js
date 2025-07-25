
import { jwt } from "jsonwebtoken";
import winston from "winston";



const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});



const protect = (req, res, next) =>{
    let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id; // Note: Should be corrected to req.user = decoded; for role access
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
}


const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};



const official = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'official')) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized' });
  }
};



export {
    protect,
    admin,
    official
}