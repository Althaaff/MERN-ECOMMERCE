import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  await mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Mongo Db connected successfully.."))
    .catch((error) => console.log(error));
};

export { connectDB };
