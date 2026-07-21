const jwt = require("jsonwebtoken");
const env  = require("../config/env");

/**
 * Generate a JWT token for a hashed identity.
 * Token contains ONLY the hashed identity — never the raw wallet.
 */
const generateToken = (hashedIdentity) => {
  return jwt.sign(
    { id: hashedIdentity },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
};

/**
 * Middleware: verify JWT token on protected routes.
 */
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized — no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired — please re-authenticate" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = { generateToken, protect };