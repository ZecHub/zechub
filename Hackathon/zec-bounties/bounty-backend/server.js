require("dotenv").config();
const cron = require("node-cron");
const express = require("express");
const cors = require("cors");
const { initSSE } = require("./helpers/broadcast");

const app = express();

// SSE endpoint for frontend to subscribe
app.get("/events", (req, res) => {
  initSSE(req, res);
});

// Run every Sunday at 10 PM
cron.schedule("0 22 * * 0", async () => {
  console.log("Processing Sunday batch payments...");
  console.log("Batch payment list:", paymentList);
  // call your processBatchPayments(paymentList) here
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/api/bounties", require("./routes/bounties"));
app.use("/api/transactions", require("./routes/transactions"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
