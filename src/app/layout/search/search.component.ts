import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails } from 'src/app/types/api-response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  search: string = '';
  pokemon: PokemonDetails | null = null;
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private zone: NgZone
  ) {}
  handlePokemonById() {
    if (this.search.includes(' ') || !this.search) return;
    this.zone.run(() => this.router.navigate(['loading']));
    this.pokemonService
      .getSinglePokemonById(this.search.toLowerCase())
      .pipe(
        catchError(() => {
          this.zone.run(() => this.router.navigate(['error']));
          return [];
        })
      )
      .subscribe(() => {
        this.pokemon = this.pokemonService.pokemon$.value;
        this.zone.run(() =>
          this.router.navigate([`pokemon/${this.pokemon?.id}`])
        );
      });
  }
}
