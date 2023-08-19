export type ApiResponse = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonDetails = {
  name: string;
  id: number;
  height: number;
  weight: number;
};
