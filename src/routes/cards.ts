import express, { Request, Response } from "express";
import pool from "../utils/pool";

const router = express.Router();

// GET /api/cards
router.get("/", async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM cards");
    console.log(pool);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/cards/:id
router.get("/:id", async (req: Request, res: Response) => {
  const cardId = req.params.id;
  try {
    const { rows } = await pool.query("SELECT * FROM cards WHERE id = $1", [
      cardId,
    ]);
    if (rows.length === 0) {
      res.status(404).json({ message: "Card not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error("Error fetching card:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
