const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/dbConnect");
const deviceRoutes = require("./routes/deviceRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/devices", deviceRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Device Inventory API running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});