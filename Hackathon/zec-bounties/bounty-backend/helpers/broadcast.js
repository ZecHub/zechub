// helpers/broadcast.js
const clients = [];

function initSSE(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // send initial ping
  res.write(`data: ${JSON.stringify({ message: "connected" })}\n\n`);

  clients.push(res);

  req.on("close", () => {
    const idx = clients.indexOf(res);
    if (idx !== -1) clients.splice(idx, 1);
  });
}

function broadcast(data) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach((res) => res.write(payload));
}

module.exports = { initSSE, broadcast };
