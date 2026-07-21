/**
 * Simple in-memory rate limiter.
 * In production, swap this for redis-based rate limiting.
 */

const rateLimitStore = new Map();

const createRateLimit = ({ windowMs = 60000, max = 100, message = "Too many requests" } = {}) => {
  return (req, res, next) => {
    // Use hashed identity if available, otherwise fall back to IP
    const key = req.user?.id || req.ip;
    const now = Date.now();

    if (!rateLimitStore.has(key)) {
      rateLimitStore.set(key, { count: 1, startTime: now });
      return next();
    }

    const record = rateLimitStore.get(key);

    // Reset window if expired
    if (now - record.startTime > windowMs) {
      rateLimitStore.set(key, { count: 1, startTime: now });
      return next();
    }

    // Increment count
    record.count += 1;

    if (record.count > max) {
      return res.status(429).json({
        success: false,
        message,
        retryAfter: Math.ceil((windowMs - (now - record.startTime)) / 1000),
      });
    }

    next();
  };
};

// Pre-configured limiters
const apiLimiter    = createRateLimit({ windowMs: 60000,  max: 100, message: "Too many API requests"    });
const authLimiter   = createRateLimit({ windowMs: 300000, max: 10,  message: "Too many auth attempts"   });
const tradeLimiter  = createRateLimit({ windowMs: 60000,  max: 30,  message: "Too many trade requests"  });

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now - record.startTime > 300000) rateLimitStore.delete(key);
  }
}, 300000);

module.exports = { apiLimiter, authLimiter, tradeLimiter };