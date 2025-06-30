import jwt from 'jsonwebtoken';

const authMiddelware = async (req, res, next) => {
  try {
    const token = req.headers.token; // or wherever you get your token
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, no token" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure req.body exists before assigning
    if (!req.body) req.body = {};
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(401).json({ success: false, message: "Token is invalid or expired" });
  }
};

export default authMiddelware;