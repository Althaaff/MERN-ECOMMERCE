import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleWare.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users", authenticate, authorizeAdmin, getAllUsers);

export default router;
