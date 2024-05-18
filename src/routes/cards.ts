import express, { Request, Response } from "express";

const router = express.Router();

// GET /api/cards
router.get("/", (req: Request, res: Response) => {
  // Logic to fetch all cards from the database
  res.send("GET all cards");
});

// GET /api/cards/:id
router.get("/:id", (req: Request, res: Response) => {
  const cardId = req.params.id;
  // Logic to fetch a card by ID from the database
  res.send(`GET card with ID ${cardId}`);
});

export default router;
