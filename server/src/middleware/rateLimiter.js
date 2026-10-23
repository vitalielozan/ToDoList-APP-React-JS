import rateLimit from 'express-rate-limit';
import { MongoDBStore } from '@iroomit/rate-limit-mongodb';

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  store: new MongoDBStore({
    uri: process.env.MONGO_URL,
    collectionName: 'rateLimits',
  }),
});

export default rateLimiter;
