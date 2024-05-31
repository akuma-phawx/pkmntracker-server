import express, { Request, Response } from "express";
import pool from "../utils/pool";

const router = express.Router();

/**
 * Retrieves all cards from the database.
 * @returns {Promise<Array<any>>} A promise that resolves to an array of cards.
 */
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

/**
 * Retrieves cards from the database based on the provided card name.
 *
 * @param {string} name - The name of the card to search for.
 * @returns {Promise<any>} - A promise that resolves to the retrieved cards.
 */
router.get("/search/:name", async (req: Request, res: Response) => {
  const cardName = req.params.name;
  try {
    const { rows } = await pool.query("SELECT * FROM cards WHERE name = $1", [
      cardName,
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

/**
 * Retrieves cards from the database based on the provided set ID.
 *
 * @param {string} id - The ID of the set to search for.
 * @returns {Promise<any>} - A promise that resolves to the retrieved cards.
 */
router.get("/set/:id", async (req: Request, res: Response) => {
  const setId = req.params.id;
  try {
    const { rows } = await pool.query("SELECT * FROM cards WHERE set_id = $1", [
      setId,
    ]);
    if (rows.length === 0) {
      res.status(404).json({ message: "Card not found" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error("Error fetching card:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Retrieves a card from the database based on the provided card ID.
 *
 * @param {string} id - The ID of the card to search for.
 * @returns {Promise<any>} - A promise that resolves to the retrieved card.
 */
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
