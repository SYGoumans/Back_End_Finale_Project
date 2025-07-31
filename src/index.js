import express from "express";
import * as Sentry from "@sentry/node";

import loginRoutes from "./routes/login.js";
import userRoutes from "./routes/users.js";
import hostRoutes from "./routes/hosts.js";
import propertyRoutes from "./routes/properties.js";
import bookingRoutes from "./routes/bookings.js";
import reviewRoutes from "./routes/reviews.js";

import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

const app = express();

app.use(Sentry.Handlers.requestHandler());
app.use(logger);
app.use(express.json());

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My Sentry Test Error!");
});

// Routes
app.use("/login", loginRoutes);
app.use("/users", userRoutes);
app.use("/hosts", hostRoutes);
app.use("/properties", propertyRoutes);
app.use("/bookings", bookingRoutes);
app.use("/reviews", reviewRoutes);

// Foutafhandeling
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
