import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: "Access denied. No token provided."
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'zcash-donation-secret');
    
    // Attach user data to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: "Token expired"
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: "Invalid token"
      });
    }

    res.status(401).json({
      success: false,
      error: "Authentication failed"
    });
  }
};

// Optional: Middleware to attach user if token exists, but don't require auth
export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'zcash-donation-secret');
      req.user = decoded;
    } catch (error) {
      // Silently fail - user is not authenticated but can still access the route
      req.user = null;
    }
  }
  
  next();
};