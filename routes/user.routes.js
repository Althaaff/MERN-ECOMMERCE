import express from "express";
import {
  createUser,
  getCurrentUserProfile,
  loginUser,
  logoutCurrentUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutCurrentUser);
router.get("/profile", authenticate, getCurrentUserProfile);

export default router;
