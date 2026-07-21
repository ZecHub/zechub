const express    = require("express");
const http       = require("http");
const { Server } = require("socket.io");
const cors       = require("cors");
const env        = require("./config/env");
const { connectDB } = require("./config/db");
const { startPriceFeed }  = require("./services/priceFeeds");
const { initWebSocket }   = require("./websocket/index");

// Routes
const authRoutes      = require("./routes/auth");
const agentRoutes     = require("./routes/agent");
const marketsRoutes   = require("./routes/markets");
const portfolioRoutes = require("./routes/portfolio");
const supportRoutes   = require("./routes/support");

// ── App Setup ────────────────────────────────────────────────────────────────
const app    = express();
const server = http.createServer(app);
const io     = new Server(server, {
  cors: { origin: env.CLIENT_URL, methods: ["GET", "POST"] },
});

// ── Middleware ───────────────────────────────────────────────────────────────
app.set("io", io);
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth",      authRoutes);
app.use("/api/agent",     agentRoutes);
app.use("/api/markets",   marketsRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/support",   supportRoutes);

// ── Health Check ─────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Zaygent server is running", env: env.NODE_ENV, ts: new Date() });
});

// ── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ── Start ────────────────────────────────────────────────────────────────────
async function startServer() {
  try {
    await connectDB();
  } catch (err) {
    console.warn("⚠️  Running without database — some features disabled");
  }
  initWebSocket(io);
  startPriceFeed(30000);
  server.listen(env.PORT, () => {
    console.log(`🚀 Zaygent server running on port ${env.PORT}`);
    console.log(`📡 WebSocket ready`);
    console.log(`🌍 Accepting requests from ${env.CLIENT_URL}`);
  });
}

startServer();