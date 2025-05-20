// server.js (final working version for Railway)

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log("✅ MongoDB connection successful!"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

const port = process.env.PORT || 3000;

// ✅ This line is key for Railway to work:
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 App running on port ${port}...`);
});

app.get("/", (req, res) => {
  res.status(200).send("✅ Server is LIVE on Railway!");
});
