import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Pokemon, PokemonDetails } from '../types/api-response';
import {
  BehaviorSubject,
  Observable,
  forkJoin,
  map,
  mergeMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public url: string = 'https://pokeapi.co/api/v2/pokemon';
  next$: BehaviorSubject<string | null>;
  previous$: BehaviorSubject<string | null>;
  allPokemon$: BehaviorSubject<PokemonDetails[] | null>;
  pokemon$: BehaviorSubject<PokemonDetails | null>;

  constructor(private http: HttpClient) {
    this.next$ = new BehaviorSubject<string | null>(null);
    this.previous$ = new BehaviorSubject<string | null>(null);
    this.allPokemon$ = new BehaviorSubject<PokemonDetails[] | null>(null);
    this.pokemon$ = new BehaviorSubject<PokemonDetails | null>(null);
  }

  getPokemons(url = this.url, limit?: number): Observable<any> {
    limit ? (url = url + '?limit=' + limit) : url;
    return this.http.get<ApiResponse>(url).pipe(
      mergeMap((apiResponse) => {
        const detailObservables = apiResponse.results.map((pokemon) => {
          return this.http.get<PokemonDetails>(pokemon.url);
        });

        return forkJoin(detailObservables).pipe(
          map((details) => {
            this.next$.next(apiResponse.next);
            this.previous$.next(apiResponse.previous);
            this.allPokemon$.next(details);
          })
        );
      })
    );
  }

  getSinglePokemonDetail(id: number) {
    return this.http.get<PokemonDetails>(this.url + '/' + id).pipe(
      map((answer) => {
        this.pokemon$.next(answer);
      })
    );
  }
}
