const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: Number(process.env.PORT || 3000),
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.DATABASE_URL ||
    "mongodb://localhost:27017/gestion_ganadera",
  jwtSecret: process.env.JWT_SECRET || "change-me-in-production",
  jwtExpiration: process.env.JWT_EXPIRATION || "24h",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
};

module.exports = env;