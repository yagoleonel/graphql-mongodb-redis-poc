export interface IPokemon {
  name: string;
  id: string;
  imageurl: string;
  height: number;
  category: string;
  weight: number;
  typeofpokemon?: string[];
  weaknesses?: string[];
  evolutions?: string[];
  abilities?: string[];
}

export type PokemonFilter = {
  name?: string;
  heightMin?: number;
  heightMax?: number;
  category?: string;
  weightMin?: number;
  weightMax?: number;
  typeofpokemon?: string;
  weaknesses?: string;
}
