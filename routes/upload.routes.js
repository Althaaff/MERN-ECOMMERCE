import express from "express";
import upload from "../middlewares/multerStorage.js";
import { uploadImages } from "../controllers/upload.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post(
  "/multiple",
  authenticate,
  authorizeAdmin,
  upload.array("images", 5),
  uploadImages
);

export default router;
