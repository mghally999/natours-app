const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// Load env vars
dotenv.config({ path: "./config.env" });

// Use full connection string
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log("✅ MongoDB connection successful!"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Railway provides its own PORT variable — use that
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 App running on port ${port}...`);
});
