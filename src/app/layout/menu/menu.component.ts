import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
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
    this.pokemonService.getPokemons().subscribe(() => {});
    this.pokemonService.next$.subscribe((next) => (this.next = next));
    this.pokemonService.previous$.subscribe(
      (previous) => (this.previous = previous)
    );
    this.pokemonService.currentUrl$.subscribe(
      (current) => (this.currentUrl = current)
    );
  }

  handleNextOrPrevious(url?: string | null) {
    !url ? (url = this.pokemonService.url) : url;
    this.pokemonService.getPokemons(url).subscribe(() => {
      this.next = this.pokemonService.next$.value;
      this.previous = this.pokemonService.previous$.value;
    });
  }

  handleLimitChange() {
    this.pokemonService
      .getPokemons(this.currentUrl.split('&')[0], this.pokemonLimit)
      .subscribe();
  }

  handlePokemonByType() {
    this.pokemonService.getPokemonByType(this.type).subscribe();
  }

  handlePokemonByName() {
    this.pokemonService
      .getSinglePokemonByName(this.search.toLowerCase())
      .subscribe(() => {
        this.pokemon = this.pokemonService.pokemon$.value;
        this.zone.run(() =>
          this.router.navigate([`pokemon/${this.pokemon?.id}`])
        );
      });
  }
}
