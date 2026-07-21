const { generateActivityEvent } = require("../services/priceFeeds");

/**
 * Sets up WebSocket events and starts the live activity feed.
 */
const initWebSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Send a welcome event
    socket.emit("connected", { message: "Connected to Zaygent live feed", ts: new Date() });

    // Start streaming activity events to this client
    const feedInterval = setInterval(() => {
      const event = generateActivityEvent();
      socket.emit("activity", event);
    }, 1800);

    // Client can subscribe to a specific chain
    socket.on("subscribe:chain", (chain) => {
      socket.join(`chain:${chain}`);
      console.log(`📡 ${socket.id} subscribed to ${chain}`);
    });

    // Client can toggle agent
    socket.on("agent:toggle", (data) => {
      io.emit("agent:status", { isActive: data.isActive, ts: new Date() });
    });

    // Cleanup on disconnect
    socket.on("disconnect", () => {
      clearInterval(feedInterval);
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = { initWebSocket };