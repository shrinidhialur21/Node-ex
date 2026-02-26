import http from "http";

const PORT = process.env.PORT || 3000;

function logInfo(message) {
  console.log(`${new Date().toISOString()} INFO  ${message}`);
}

function logWarn(message) {
  console.warn(`${new Date().toISOString()} WARN  ${message}`);
}

function logError(message, err) {
  console.error(`${new Date().toISOString()} ERROR ${message}`);
  if (err) console.error(err.stack || err);
}

setInterval(() => {
  logInfo("Heartbeat: service is running");

  if (Math.random() < 0.3) {
    logWarn("High memory usage detected");
  }

  if (Math.random() < 0.25) {
    try {
      const obj = null;
      obj.test(); // runtime error
    } catch (err) {
      logError("Unhandled runtime exception occurred", err);
    }
  }

  if (Math.random() < 0.2) {
    Promise.reject(new Error("Simulated async failure")).catch((err) =>
      logError("Async operation failed", err)
    );
  }
}, 3000);

const server = http.createServer((req, res) => {
  if (req.url === "/error-log") {
    logError("Manual error log without crash");
    res.end("Error log generated\n");
    return;
  }

  if (req.url === "/crash") {
    logError("Manual crash triggered");
    throw new Error("Manual crash endpoint hit");
  }

  logInfo(`Incoming request ${req.method} ${req.url}`);
  res.end("OK\n");
});

server.listen(PORT, () => {
  logInfo(`Server started on port ${PORT}`);
});
