import jwt from "jsonwebtoken"
import User from "../model/auth.model.js"

export const authMiddleware=async(req,res,next)=>{
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Bearer token is required" });
  }

  let decoded;
  try {
    const token = authorization.slice("Bearer ".length).trim();
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }

  // `id` supports tokens issued before the payload was standardized to `userId`.
  const userId = decoded.userId ?? decoded.id;
  if (!userId) {
    return res.status(401).json({ msg: "Token does not identify a user" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user;
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(500).json({ msg: "Authentication could not be completed" });
  }
}