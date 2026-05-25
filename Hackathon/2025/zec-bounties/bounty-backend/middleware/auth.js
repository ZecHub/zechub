const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized");
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}

function isAdmin(req, res, next) {
  if (req.user.role !== "ADMIN") return res.status(403).send("Admins only");
  next();
}

module.exports = { authenticate, isAdmin };
