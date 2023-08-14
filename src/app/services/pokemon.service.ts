import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Pokemon, PokemonDetails } from '../types/api-response';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon';
  public pokemons: Pokemon[] = [];
  allPokemon$: BehaviorSubject<Pokemon[] | null>;
  next$: BehaviorSubject<string | null>;
  previous$: BehaviorSubject<string | null>;
  pokemon$: BehaviorSubject<PokemonDetails | null>;
  constructor(private http: HttpClient) {
    this.allPokemon$ = new BehaviorSubject<Pokemon[] | null>(null);
    this.next$ = new BehaviorSubject<string | null>(null);
    this.previous$ = new BehaviorSubject<string | null>(null);
    this.pokemon$ = new BehaviorSubject<PokemonDetails | null>(null);
  }

  getPokemons(url = this.url) {
    return this.http.get<ApiResponse>(url).pipe(
      tap((answer) => {
        this.allPokemon$.next(answer.results);
      })
    );
  }
}
