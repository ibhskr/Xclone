import jwt from "jsonwebtoken";
import { secret } from "../config/env.js";
import cookie from "cookie"; // Use cookie parser if necessary

const authMiddleware = (req, res, next) => {
  try {
    // Check if the 'cookie' header exists
    const cookies = req.headers.cookie;
    if (!cookies) {
      return res.status(401).json({
        success: false,
        message: "No cookies found, authorization required",
      });
    }

    // Parse the cookies to extract the token (assuming token is stored under 'token' key)
    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing or malformed",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, secret);

    // Attach user information from token to the request
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed:", error);

    // Return an error if token verification fails
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

export default authMiddleware;
