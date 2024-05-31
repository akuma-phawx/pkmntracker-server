/**
 * Main entry point of the Pkmntracker server.
 * Initializes and starts the Express application.
 */

import express, { Express } from "express";
import { config } from "dotenv";
import cardRoutes from "./routes/cards";
import setRoutes from "./routes/sets";
import cors from "cors";

config();

/**
 * Express application instance.
 */
const app: Express = express();

app.use(express.json());
app.use(cors());

// Mount API routes
app.use("/api/cards", cardRoutes);
app.use("/api/sets", setRoutes);

/**
 * Port that the server will listen on.
 */
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Pkmntracker server is running`);
});
