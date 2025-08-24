import rateLimit from 'express-rate-limit';
import MongoStore from 'rate-limit-mongo';

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  store: new MongoStore({
    uri: process.env.MONGO_URL,
    collectionName: 'rateLimits',
    expireTimeMs: 15 * 60 * 1000, // 15 minutes
    errorHandler: console.error,
  }),
});

export default rateLimiter;
