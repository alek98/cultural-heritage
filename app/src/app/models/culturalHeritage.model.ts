import { chLocation } from "./chLocation.model";
import { chType } from "./chType.model";

export class CulturalHeritage {
  name: string;
  chtype: chType;
  description: string;
  avgRating: number;
  location: chLocation;
}