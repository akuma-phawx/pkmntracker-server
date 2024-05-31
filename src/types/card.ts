import { Set } from "@/types/set";

/**
 * Represents a Pokemon card.
 */
export interface Card {
  /** The unique identifier of the card. */
  id: string;
  /** The name of the card. */
  name: string;
  /** The supertype of the card (e.g., "Pokémon", "Trainer", "Energy"). */
  supertype: string;
  /** The subtypes of the card (e.g., "Basic", "Stage 1", "Item", "Special Energy"). */
  subtypes: string[];
  /** The hit points of the card. */
  hp: string;
  /** The types of the card (e.g., "Fire", "Water", "Grass"). */
  types: string[];
  /** The energy cost required to retreat the card. */
  retreat_cost: string[];
  /** The converted energy cost required to retreat the card. */
  converted_retreat_cost: number;
  /** The number of the card within its set. */
  number: string;
  /** The artist who illustrated the card. */
  artist: string;
  /** The rarity of the card. */
  rarity: string;
  /** The flavor text of the card. */
  flavor_text: string;
  /** The national Pokedex numbers associated with the card. */
  national_pokedex_numbers: number[];
  /** The card's regulation mark */
  regulation_mark: string;
  /** The small image of the card */
  small_image_url: string;
  /** The large image of the card. */
  large_image_url: string;
  /** The card's corresponding set id */
  set_id: Set["id"];
}
