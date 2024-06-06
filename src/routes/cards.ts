import express, { Request, Response } from "express";
import pool from "../utils/pool";
import { Card } from "@/types/card";

const router = express.Router();

/**
 * @typedef {Object} Card
 * @property {string} id - The unique identifier for the card.
 * @property {string} name - The name of the card.
 * @property {string} supertype - The supertype of the card.
 * @property {string[]} subtypes - The subtypes of the card.
 * @property {string} hp - The HP of the card.
 * @property {string[]} types - The types of the card.
 * @property {string[]} retreat_cost - The retreat cost of the card.
 * @property {number} converted_retreat_cost - The converted retreat cost of the card.
 * @property {string} number - The number of the card.
 * @property {string} artist - The artist of the card.
 * @property {string} rarity - The rarity of the card.
 * @property {string} flavor_text - The flavor text of the card.
 * @property {number[]} national_pokedex_numbers - The national pokedex numbers associated with the card.
 * @property {string} regulation_mark - The regulation mark of the card.
 * @property {string} small_image_url - The URL of the small image of the card.
 * @property {string} large_image_url - The URL of the large image of the card.
 * @property {string} set_id - The ID of the set the card belongs to.
 */

/**
 * Retrieves all cards from the database.
 * @route GET /cards
 * @returns {Promise<Array<Card>>} A promise that resolves to an array of cards.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM cards");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Retrieves cards from the database based on the provided card name.
 * @route GET /cards/search/:name
 * @param {string} name - The name of the card to search for.
 * @returns {Promise<Array<Card>>} A promise that resolves to the retrieved cards.
 */
router.get("/search/:name", async (req: Request, res: Response) => {
  const cardName = req.params.name;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM cards WHERE name ILIKE $1",
      [`%${cardName}%`]
    );
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
 * Retrieves cards from the database based on the provided set ID.
 * @route GET /cards/set/:id
 * @param {string} id - The ID of the set to search for.
 * @returns {Promise<Array<Card>>} A promise that resolves to the retrieved cards.
 */
router.get("/set/:id", async (req: Request, res: Response) => {
  const setId = req.params.id;
  try {
    const { rows } = await pool.query("SELECT * FROM cards WHERE set_id = $1", [
      setId,
    ]);
    if (rows.length === 0) {
      res.status(404).json({ message: "Cards not found" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Retrieves cards from the database based on the provided artist.
 * @route GET /cards/artist/:artist
 * @param {string} artist - The artist of the card to search for.
 * @returns {Promise<Array<Card>>} A promise that resolves to the retrieved cards.
 */
router.get("/artist/:artist", async (req: Request, res: Response) => {
  const artist = req.params.artist;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM cards WHERE artist ILIKE $1",
      [`%${artist}%`]
    );
    if (rows.length === 0) {
      res.status(404).json({ message: "Cards not found" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Retrieves cards from the database based on the provided type.
 * @route GET /cards/type/:type
 * @param {string} type - The type of the card to search for.
 * @returns {Promise<Array<Card>>} A promise that resolves to the retrieved cards.
 */
router.get("/type/:type", async (req: Request, res: Response) => {
  const type = req.params.type;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM cards WHERE $1 = ANY(types)",
      [type]
    );
    if (rows.length === 0) {
      res.status(404).json({ message: "Cards not found" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Retrieves cards from the database based on the provided rarity.
 * @route GET /cards/rarity/:rarity
 * @param {string} rarity - The rarity of the card to search for.
 * @returns {Promise<Array<Card>>} A promise that resolves to the retrieved cards.
 */
router.get("/rarity/:rarity", async (req: Request, res: Response) => {
  const rarity = req.params.rarity;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM cards WHERE rarity ILIKE $1",
      [`%${rarity}%`]
    );
    if (rows.length === 0) {
      res.status(404).json({ message: "Cards not found" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Retrieves a card from the database based on the provided card ID.
 * @route GET /cards/:id
 * @param {string} id - The ID of the card to search for.
 * @returns {Promise<Card>} A promise that resolves to the retrieved card.
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
