export type ApiResponse = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};

export type ApiResponseType = {
  pokemon: { pokemon: Pokemon }[];
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
  sprites: {
    back_default: string | null;
    front_default: string | null;
  };
};
