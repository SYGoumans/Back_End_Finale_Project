import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // JWT token meegeven als 'Bearer <token>'
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });

    req.user = user;
    next();
  });
};

export default authenticateToken;
