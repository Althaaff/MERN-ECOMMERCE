import express from "express";
import { getAllBags, getSingleBag } from "../controllers/bag.controller.js";

const router = express.Router();

router.route("/").get(getAllBags);
router.route("/:id").get(getSingleBag);

export default router;
