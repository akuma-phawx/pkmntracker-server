//create card interface
import { Set } from "@/types/set";

export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesFrom: string;
  rules: string[];
  attacks: any[];
  weaknesses: any[];
  resistances: any[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  images: Images;
}
interface Images {
  small: string;
  large: string;
}
interface Legalities {
  unlimited: string;
  standard: string;
  expanded: string;
}
