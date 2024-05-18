import express, { Express } from "express";
import { config } from "dotenv";
import cardRoutes from "./routes/cards";

config();
const app: Express = express();
// Middleware to parse JSON bodies into `req.body`
app.use(express.json());

// Mount API routes
app.use("/api/cards", cardRoutes);

const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
  console.log(`Pkmntracker server is running on http://localhost:${PORT}`);
});
