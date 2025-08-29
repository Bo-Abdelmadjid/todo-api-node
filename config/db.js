const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDb connected successfully");
  } catch (error) {
    console.error("MongoDb connection error:", error.message);
    process.exit(1);
  }
}

module.exports = { connectDb };
