import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

// middlewares :
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// all required routes :
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// listen the port :
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
