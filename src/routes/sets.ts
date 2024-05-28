import express, { Request, Response } from "express";
import pool from "../utils/pool";

const router = express.Router();

// GET /api/sets
router.get("/", async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM sets");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching sets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/sets/:id
router.get("/:id", async (req: Request, res: Response) => {
  const cardId = req.params.id;
  try {
    const { rows } = await pool.query("SELECT * FROM sets WHERE id = $1", [
      cardId,
    ]);
    if (rows.length === 0) {
      res.status(404).json({ message: "Set not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error("Error fetching set:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//find set by name
router.get("/search/:name", async (req: Request, res: Response) => {
  const setName = req.params.name;
  try {
    const { rows } = await pool.query("SELECT * FROM sets WHERE name = $1", [
      setName,
    ]);
    if (rows.length === 0) {
      res.status(404).json({ message: "Set not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error("Error fetching set:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
