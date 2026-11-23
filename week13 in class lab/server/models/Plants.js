import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    height: {
      type: String,
      required: true,
      trim: true,
    },
    season: {
      type: String,
      required: true,
      trim: true,
    },
    rarity: {
      type: String,
      enum: ["common", "uncommon", "rare"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: "No description available.",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("plant", plantSchema);