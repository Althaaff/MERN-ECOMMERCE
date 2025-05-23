import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "./asyncHandler.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // read JWT from `jwt` cookie :
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded?.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    new Error("Not authorized! No Token!");
  }
});

export const authorizeAdmin = asyncHandler(async (req, res, next) => {
  try {
    if (req.user && req.user?.isAdmin) {
      next();
    } else {
      res.status(401).send("Not authorized as an admin.");
    }
  } catch (error) {
    next(error);
  }
});
