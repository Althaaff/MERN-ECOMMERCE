import { asyncHandler } from "../middlewares/asyncHandler.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  if (!username || !email || !password) {
    return res.status(400).send("Please fill all the inputs."); // Return here
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send("User already exists"); // Return here
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    return res.status(201).json({
      // Return here
      message: "User registered successfully.",
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    return res.status(400).send("Invalid user data"); // Send response here
  }
});
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser?._id);

      res.status(201).json({
        success: true,
        message: "User login successfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect!",
      });
    }
  }
});

export const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httyOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const allUsers = await User.find({});

    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

export const getCurrentUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id);

    console.log(user);

    if (user) {
      res.json({
        _id: user?._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: "User not found!" });
      throw new Error("User not found.");
    }
  } catch (error) {
    next(error);
  }
});
