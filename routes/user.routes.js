import express from "express";
import {
  createUser,
  getAllUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUser);

router.post("/auth", loginUser);
router.post("/logout", logoutUser);

export default router;
