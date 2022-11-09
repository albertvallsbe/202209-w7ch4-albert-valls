import dotenv from "dotenv";

dotenv.config();

export const {
  MONGODB_URL: mongoDbUrl,
  PORT: port,
  JWT_SECRET: jwtSecret,
  DEBUG: debug,
  MONGO_DEBUG: mongoDebug,
} = process.env;
