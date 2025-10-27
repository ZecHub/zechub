import express from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import {setupSwagger}  from './swagger.js';

import dotenv from "dotenv";

import { setupDatabase } from "./src/models/setup.js";
import { setupDiscordAuth } from "./config/discord.js";
import campaignRoutes from "./src/routes/campaigns.js";
import donationRoutes from "./src/routes/donations.js";
import authRoutes from "./src/routes/auth.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { verifyToken } from "./src/middleware/discordAuth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
await setupDatabase();

// Setup Discord authentication
setupDiscordAuth();

// Swagger Setuo
setupSwagger(app);

// Middleware
app.use(helmet());

// Enable CORS with specific options
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests globally
app.options('*', cors());

app.use(express.json({ limit: "10mb" }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "zcash-donation-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/donations", donationRoutes);

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/dashboard", verifyToken, (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/discord");
  }
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Zcash Donation Platform",
    user: req.user ? req.user.username : "Not authenticated",
    timestamp: new Date().toISOString(),
  });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Zcash Donation Platform running on port ${PORT}`);
  console.log(`🔐 Discord OAuth enabled`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
