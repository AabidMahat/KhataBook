const express = require("express");

const http = require("http");
const WebSocket = require("ws");

const server = http.createServer(app);

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    const { userId, latitude, longitude } = data;

    console.log(`Received location from ${userId}: ${latitude}, ${longitude}`);

    // Broadcast updated location to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            userId,
            latitude: latitude,
            longitude: longitude,
          })
        );
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const accountRoute = require("./routes/accountRoute");
const transactionRoute = require("./routes/transactionRoute");
const staffRoute = require("./routes/staffRoute");
const studentRoute = require("./routes/studentRoute");
const classRoute = require("./routes/classRoute");
const teacherRoute = require("./routes/teacherRoutes");

const userRoute = require("./routes/userRoute");

const adminRoute = require("./routes/adminRoute");

const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use("/api/v3/account", accountRoute);
app.use("/api/v3/admin", adminRoute);
app.use("/api/v3/transaction", transactionRoute);
app.use("/api/v3/staff", staffRoute);
app.use("/api/v3/student", studentRoute);
app.use("/api/v3/class", classRoute);
app.use("/api/v3/teacher", teacherRoute);
app.use("/api/v3/user", userRoute);

module.exports = app;
