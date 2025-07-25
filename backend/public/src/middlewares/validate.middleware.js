
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError";
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






const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation errors: ${JSON.stringify(errors.array())}`)
    return res.status(400).json({ errors: errors.array() });
    
  }
  next();
};


export {
    validate
}                                                                                                                                                                                                                                                                         