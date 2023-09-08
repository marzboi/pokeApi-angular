import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApiResponse,
  ApiResponseType,
  PokemonDetails,
} from '../types/api-response';
import { BehaviorSubject, forkJoin, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public url: string = 'https://pokeapi.co/api/v2/';
  next$: BehaviorSubject<string | null>;
  pokemonsList$: BehaviorSubject<PokemonDetails[]>;
  pokemon$: BehaviorSubject<PokemonDetails | null>;
  private fetchPokemons: PokemonDetails[] = [];
  constructor(private http: HttpClient) {
    this.next$ = new BehaviorSubject<string | null>(null);
    this.pokemonsList$ = new BehaviorSubject<PokemonDetails[]>([]);
    this.pokemon$ = new BehaviorSubject<PokemonDetails | null>(null);
  }

  getPokemons(url?: string) {
    url ? (url = url) : (url = this.url + 'pokemon?limit=40&offset=0');
    return this.http.get<ApiResponse>(url).pipe(
      mergeMap((apiResponse) => {
        const detailObservables = apiResponse.results.map((pokemon) => {
          return this.http.get<PokemonDetails>(pokemon.url);
        });

        return forkJoin(detailObservables).pipe(
          map((details) => {
            this.next$.next(apiResponse.next);
            this.fetchPokemons = [...this.fetchPokemons, ...details];
            this.pokemonsList$.next(this.fetchPokemons);
          })
        );
      })
    );
  }

  getSinglePokemonById(id: number | string) {
    return this.http.get<PokemonDetails>(this.url + 'pokemon/' + id).pipe(
      map((answer) => {
        this.pokemon$.next(answer);
      })
    );
  }

  getPokemonByType(type: number) {
    return this.http.get<ApiResponseType>(this.url + 'type/' + type).pipe(
      mergeMap((apiResponse) => {
        const detailObservables = apiResponse.pokemon.map((pokemon) => {
          return this.http.get<PokemonDetails>(pokemon.pokemon.url);
        });

        return forkJoin(detailObservables).pipe(
          map((details) => {
            this.next$.next(null);
            this.pokemonsList$.next(details);
          })
        );
      })
    );
  }

  resetPokemonList() {
    return this.http.get<ApiResponse>('https://pokeapi.co/api/v2/pokemon').pipe(
      mergeMap((apiResponse) => {
        const detailObservables = apiResponse.results.map((pokemon) => {
          return this.http.get<PokemonDetails>(pokemon.url);
        });

        return forkJoin(detailObservables).pipe(
          map((details) => {
            this.next$.next(apiResponse.next);
            this.fetchPokemons = details;
            this.pokemonsList$.next(this.fetchPokemons);
          })
        );
      })
    );
  }

  jumpToPokemon(id: number) {
    return this.http
      .get<ApiResponse>(this.url + `pokemon?limit=40&offset=${id - 1}`)
      .pipe(
        mergeMap((apiResponse) => {
          const detailObservables = apiResponse.results.map((pokemon) => {
            return this.http.get<PokemonDetails>(pokemon.url);
          });

          return forkJoin(detailObservables).pipe(
            map((details) => {
              this.next$.next(apiResponse.next);
              console.log(this.next$.value);
              this.fetchPokemons = [...details];
              this.pokemonsList$.next(this.fetchPokemons);
            })
          );
        })
      );
  }
}
