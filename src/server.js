import mongoose from "mongoose";
import app from "./app.js";
import config from "./app/config/index.js";

async function main() {
  try {
    if (config.databaseUrl) {
      await mongoose.connect(config.databaseUrl);
      console.log("DB connected successfully");
    } else {
      console.log("No MONGODB_URI database URL configured in environment");
    }

    app.get("/api/health", (req, res) => res.json({ status: "ok" }));

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log("DB connection error:", error);
  }
}

main();
