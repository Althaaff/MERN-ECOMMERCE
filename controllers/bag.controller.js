import { Bag } from "../models/bag.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const createBag = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      colors,
      sizes,
      images,
      isFeatured,
    } = req.body;

    if (!name || !description || !price || !category || !images) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const newBag = new Bag({
      name,
      description,
      price,
      category,
      stock,
      colors,
      sizes,
      images,
      isFeatured,
      createdBy: req.user._id,
    });

    const savedBag = await newBag.save();
    res
      .status(201)
      .json({ message: "Bag created successfully", bag: savedBag });
  } catch (error) {
    console.error("Create Bag Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export const getAllBags = asyncHandler(async (req, res, next) => {
  try {
    const bags = await Bag.find().sort({ createdAt: -1 });

    res.status(201).json(bags);
  } catch (error) {
    console.error("get all bags error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export const getSingleBag = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const bag = await Bag.findById(id);

    if (!bag) {
      return res.status(404).json({ success: false, message: "Bag not found" });
    }
    res.status(201).json({
      success: true,
      bag,
    });
  } catch (error) {
    console.error("get single bag error:", error);
    res.status(500).json({ success: false, message: "server error" });
  }
});

export const updateBag = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBag = await Bag.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBag) {
      return res.status(404).json({ success: false, message: "Bag not found" });
    }

    res.status(200).json({ success: true, bag: updatedBag });
  } catch (error) {
    console.error("update bag error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export const deleteBag = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const bag = await Bag.findById(id);

    if (!bag) {
      return res.status(404).json({ success: false, message: "Bag not found" });
    }

    res
      .status(201)
      .json({ success: true, message: "Bag Deleted Successfully!" });
  } catch (error) {
    console.error("Delete Bag Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
