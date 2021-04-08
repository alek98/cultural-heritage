import { chLocation } from "./chLocation.model";
import { chType } from "./chType.model";

export interface CulturalHeritage {
  name: string;
  chtype: chType;
  description: string;
  avgRating: number;
  location: chLocation;
  id?: string;
}