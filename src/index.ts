import express, { Express } from "express";
import { config } from "dotenv";
import cardRoutes from "./routes/cards";
import setRoutes from "./routes/sets";
import cors from "cors";

config();
const app: Express = express();
// Middleware to parse JSON bodies into `req.body`
app.use(express.json());
app.use(cors());

// Mount API routes
app.use("/api/cards", cardRoutes);
app.use("/api/sets", setRoutes);

const PORT = process.env.PORT;
// Start the server
app.listen(PORT, () => {
  console.log(`Pkmntracker server is running on http://localhost:${PORT}`);
});
