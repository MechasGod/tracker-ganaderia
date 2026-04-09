const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error conectando MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
