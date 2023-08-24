import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  next: string | null = null;
  previous: string | null = null;
  pokemonLimit: number = 20;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(() => {});
    this.pokemonService.next$.subscribe((next) => (this.next = next));
    this.pokemonService.previous$.subscribe(
      (previous) => (this.previous = previous)
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
    this.pokemonService.getPokemons(undefined, this.pokemonLimit).subscribe();
  }
}
