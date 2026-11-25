const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    assetTag: {
      type: String,
      required: [true, "Asset tag is required"],
      unique: true,
      trim: true,
    },
    serialNumber: {
      type: String,
      required: [true, "Serial number is required"],
      unique: true,
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Laptop type is required"],
      enum: [
        "Gaming Laptop",
        "Business Laptop",
        "Casual / Beginner Laptop",
        "2-in-1 / Ultrabook",
        "Workstation Laptop",
        "Chromebook",],
  default: "Business Laptop",
},
    specs: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Available", "Assigned", "Maintenance", "Retired"],
      default: "Available",
    },
    assignedTo: {
      type: String,
      trim: true,
      default: "",
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    unitPrice: {
      type: Number,
      required: [true, "Unit price is required"],
      min: [0, "Unit price cannot be negative"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);