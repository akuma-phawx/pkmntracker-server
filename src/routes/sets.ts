import express, { Request, Response } from "express";
import pool from "../utils/pool";
import { Set } from "@/types/set";

const router = express.Router();

/**
 * Retrieves all sets from the database.
 * @returns {Promise<Array<Set>>} A promise that resolves to an array of sets.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM sets");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching sets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Retrieves sets from the database based on the provided set name.
 *
 * @param {string} name - The name of the set to search for.
 * @returns {Promise<Array<Set>>} - A promise that resolves to the retrieved set.
 */
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

/**
 * Retrieves sets from the database based on the provided set ID.
 *
 * @param {string} id - The ID of the set to search for.
 * @returns {Promise<Set>} - A promise that resolves to the retrieved set.
 */
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

export default router;
