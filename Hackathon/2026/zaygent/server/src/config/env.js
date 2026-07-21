const dotenv = require("dotenv");
const path   = require("path");
dotenv.config({ path: path.join(__dirname, "../../.env") });

const env = {
  PORT:         process.env.PORT         || 5000,
  NODE_ENV:     process.env.NODE_ENV     || "development",
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_KEY: process.env.SUPABASE_KEY || "",
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET:   process.env.JWT_SECRET   || "zaygent_secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  HASH_SALT:    process.env.HASH_SALT    || "zaygent_salt",
  DEXSCREENER_BASE_URL: process.env.DEXSCREENER_BASE_URL || "https://api.dexscreener.com/latest",
  CLIENT_URL:   process.env.CLIENT_URL   || "http://localhost:5173",
};

const required = ["JWT_SECRET", "HASH_SALT", "SUPABASE_URL", "SUPABASE_KEY"];
required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️  Warning: ${key} is not set in .env — using default`);
  }
});

module.exports = env;