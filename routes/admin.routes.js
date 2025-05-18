import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleWare.js";
import {
  deleteUserById,
  getAllUsers,
  getCurrentUserById,
  updateCurrentUserById,
} from "../controllers/user.controller.js";
import {
  createBag,
  deleteBag,
  updateBag,
} from "../controllers/bag.controller.js";

const router = express.Router();

router.get("/users", authenticate, authorizeAdmin, getAllUsers);
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getCurrentUserById)
  .put(authenticate, authorizeAdmin, updateCurrentUserById);

// protected bags route (admin) :
router.route("/createBag").post(authenticate, authorizeAdmin, createBag);
router.route("/update/:id").put(authenticate, authorizeAdmin, updateBag);
router.route("/delete/:id").delete(authenticate, authorizeAdmin, deleteBag);

export default router;
