import mongoose from "mongoose";

const bagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Bag name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Bag description is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    category: {
      type: String,
      enum: ["school", "college", "travel", "laptop", "trekking", "others"],
      required: [true, "Category is required"],
    },

    brand: {
      type: String,
      default: "Wildcraft",
    },

    stock: {
      type: Number,
      required: [true, "Stock is required"],
      default: 0,
    },

    colors: {
      type: [String],
      default: [],
    },

    sizes: {
      type: [String],
      default: [],
    },

    images: {
      type: [String], // URLs or Cloudinary public_ids
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: String,
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin who created it
    },
  },
  { timestamps: true }
);

const Bag = mongoose.model("Bag", bagSchema);

export { Bag };
