import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails } from 'src/app/types/api-response';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  currentUrl: string = '';
  next: string | null = null;
  previous: string | null = null;
  pokemonLimit: number = 20;
  type: number = 0;
  search: string = '';
  pokemon: PokemonDetails | null = null;
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.pokemonService.next$.subscribe((next) => (this.next = next));
    this.pokemonService.previous$.subscribe(
      (previous) => (this.previous = previous)
    );
    this.pokemonService.currentUrl$.subscribe(
      (current) => (this.currentUrl = current)
    );
  }

  handleNextOrPrevious(url?: string | null) {
    this.zone.run(() => this.router.navigate(['loading']));
    !url ? (url = this.pokemonService.url) : url;
    this.pokemonService.getPokemons(url).subscribe(() => {
      this.next = this.pokemonService.next$.value;
      this.previous = this.pokemonService.previous$.value;
      this.zone.run(() => this.router.navigate(['']));
    });
  }

  handleLimitChange() {
    this.zone.run(() => this.router.navigate(['loading']));
    this.pokemonService
      .getPokemons(this.currentUrl.split('&')[0], this.pokemonLimit)
      .subscribe(() => {
        this.zone.run(() => this.router.navigate(['']));
      });
  }

  handlePokemonByType() {
    this.zone.run(() => this.router.navigate(['loading']));
    this.pokemonService.getPokemonByType(this.type).subscribe(() => {
      this.zone.run(() => this.router.navigate(['']));
    });
  }

  handlePokemonByName() {
    if (this.search.includes(' ')) return;
    this.zone.run(() => this.router.navigate(['loading']));
    this.pokemonService
      .getSinglePokemonByName(this.search.toLowerCase())
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
