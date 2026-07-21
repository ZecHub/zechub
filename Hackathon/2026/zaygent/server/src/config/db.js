const { createClient } = require("@supabase/supabase-js");
const env = require("./env");

let supabase = null;

const connectDB = async () => {
  try {
    if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
      throw new Error("Supabase credentials not set in .env");
    }
    supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
    // Test connection
    const { error } = await supabase.from("users").select("count").limit(1);
    if (error && error.code !== "42P01") throw error; // 42P01 = table doesn't exist yet, that's ok
    console.log("✅ Supabase connected successfully");
  } catch (error) {
    console.error(`❌ Supabase Connection Error: ${error.message}`);
    throw error;
  }
};

const getDB = () => {
  if (!supabase) throw new Error("Database not initialized");
  return supabase;
};

module.exports = { connectDB, getDB };