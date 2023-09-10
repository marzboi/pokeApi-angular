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
  id: number;
  name: string;
  weight: number;
  height: number;
  stats: Stat[];
  types: Type[] | undefined[];
  sprites: {
    front_default?: string;
    back_default?: string;
    versions: {
      'generation-v': {
        'black-white': {
          animated: {
            front_default?: string;
          };
        };
      };
    };
  };
};

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export interface PokemonType {
  type_1?: string;
  type_2?: string;
}
