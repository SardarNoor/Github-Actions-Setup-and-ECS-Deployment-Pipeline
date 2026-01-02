const express = require("express");
const path = require("path");
const os = require("os");

const app = express();

const PORT = process.env.PORT || 3000;

const APP_NAME = process.env.APP_NAME || "ecs-demo-ui-app";
const APP_ENV = process.env.APP_ENV || "dev";
const APP_VERSION = process.env.APP_VERSION || "1.0.0";
const GIT_SHA = process.env.GIT_SHA || "local";
const STARTED_AT = new Date().toISOString();

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/info", (req, res) => {
  res.json({
    appName: APP_NAME,
    env: APP_ENV,
    version: APP_VERSION,
    gitSha: GIT_SHA,
    hostname: os.hostname(),
    startedAt: STARTED_AT,
    now: new Date().toISOString()
  });
});

// ALB health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} running on port ${PORT} (${APP_ENV})`);
});
