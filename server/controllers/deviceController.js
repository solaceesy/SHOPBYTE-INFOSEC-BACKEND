const mongoose = require("mongoose");
const Device = require("../models/Device");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const createDevice = async (req, res) => {
  try {
    const device = await Device.create(req.body);
    return res.status(201).json(device);
  } catch (error) {
    if (error.name === "ValidationError" || error.code === 11000) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to create device" });
  }
};

const getDevices = async (req, res) => {
  try {
    const devices = await Device.find().sort({ createdAt: -1 });
    return res.status(200).json(devices);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch devices" });
  }
};

const getDeviceById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid device ID" });
    }
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    return res.status(200).json(device);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch device" });
  }
};

const updateDevice = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid device ID" });
    }
    const updated = await Device.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Device not found" });
    }
    return res.status(200).json(updated);
  } catch (error) {
    if (error.name === "ValidationError" || error.code === 11000) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to update device" });
  }
};

const deleteDevice = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid device ID" });
    }
    const deleted = await Device.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Device not found" });
    }
    return res.status(200).json({ message: "Device deleted", id: deleted._id });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete device" });
  }
};

module.exports = {
  createDevice,
  getDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
};