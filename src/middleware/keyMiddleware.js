import { ENV } from "../config/env.js";

export const protect = async (req, res, next) => {
  const key = req.headers["x-api-key"];
  if (ENV.NODE_ENV !== "local") {
    if (!key || key !== ENV.API_KEY) {
      return res.status(403).json({ fail: "FORBIDDEN" });
    }
  }
  next();
};
