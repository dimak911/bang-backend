import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT = 3001,
  ORIGIN,
  MONGODB_URI = "",
  DB_USER,
  DB_PASSWORD,
} = process.env;
