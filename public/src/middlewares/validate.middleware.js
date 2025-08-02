
import { validationResult } from "express-validator";





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