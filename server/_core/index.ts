import "dotenv/config";
import express from "express";
import { createServer } from "http";
import https from "https";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AccessToken } from "livekit-server-sdk";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Security: Disable express fingerprint header
  app.disable("x-powered-by");

  // Security: OWASP Standard HTTP Security Headers
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(self), geolocation=()");
    next();
  });

  // Security: In-Memory API Rate Limiter (Prevents DDoS & brute-force)
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
  const MAX_REQUESTS_PER_WINDOW = 120; // 120 requests/min per IP

  app.use("/api/", (req, res, next) => {
    if (req.path === "/health") return next();
    const clientIp =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown";
    const now = Date.now();
    const record = rateLimitMap.get(clientIp);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      return next();
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
      return res.status(429).json({ error: "Too many requests. Please slow down." });
    }

    record.count += 1;
    next();
  });

  // Healthcheck Route for Nginx / Load Balancer Liveness Probes
  app.get("/api/health", (_req, res) => {
    res.status(200).json({
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  });

  // Configure body parser with size limit for file uploads
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ limit: "25mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // LiveKit Token Route
  app.get("/api/livekit-token", async (req, res, next) => {
    try {
      const { LIVEKIT_API_KEY, LIVEKIT_API_SECRET } = process.env;
      if (!LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) {
        return res.status(500).json({ error: "LiveKit API keys are not configured on the server." });
      }

      const participantIdentity = `user-${Math.floor(Math.random() * 10000)}`;
      const roomName = "reddot-support";

      const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
        identity: participantIdentity,
      });

      at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });

      const token = await at.toJwt();
      res.json({ token });
    } catch (error) {
      console.error("Error generating LiveKit token:", error);
      res.status(500).json({ error: "Failed to generate token" });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const isProd = process.env.NODE_ENV === "production";
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = isProd ? preferredPort : await findAvailablePort(preferredPort);

  if (!isProd && port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.on("error", (err: any) => {
    console.error("Server error:", err);
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use. Terminate conflicting process.`);
    }
  });

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server successfully listening on http://0.0.0.0:${port}/ (ENV: ${process.env.NODE_ENV || "development"})`);
  });

  // Zero-Downtime Graceful Shutdown Handler
  const handleShutdown = (signal: string) => {
    console.log(`Received ${signal}. Gracefully closing HTTP connections...`);
    server.close(() => {
      console.log("Server closed cleanly.");
      process.exit(0);
    });
    setTimeout(() => {
      console.error("Forced termination after 10s timeout.");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
  process.on("SIGINT", () => handleShutdown("SIGINT"));
}

startServer().catch((err) => {
  console.error("Fatal error starting server:", err);
  process.exit(1);
});
