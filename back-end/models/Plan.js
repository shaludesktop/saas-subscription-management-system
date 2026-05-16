import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    appId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SaasApp",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: String,
      enum: ["free", "weekly", "monthly", "yearly"],
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    seatLimit: {
      type: Number,
      default: 1,
      min: 1,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

planSchema.index({ appId: 1, name: 1 }, { unique: true });

const Plan = mongoose.model("Plan", planSchema);
export default Plan;