import rateLimit from 'express-rate-limit';

const ONE_SECOND_IN_MS = 1000;
const SECONDS_IN_ONE_MINUTE = 60;
const timeInMinutesToRateLimitRequest = 5;

export const useLimiter = rateLimit({
  windowMs: timeInMinutesToRateLimitRequest * SECONDS_IN_ONE_MINUTE * ONE_SECOND_IN_MS,
  max: 100,
  handler(req, res) {
    res.status(429).json({
      message: 'Too many requests, please try again later.',
    });
  },
});
