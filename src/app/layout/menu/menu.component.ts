import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  currentUrl: string = '';
  pokemonLimit: number = 20;
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private zone: NgZone
  ) {}

  handleLimitChange() {
    this.zone.run(() => this.router.navigate(['loading']));
    this.pokemonService
      .getPokemons(this.currentUrl.split('&')[0], this.pokemonLimit)
      .subscribe(() => {
        this.zone.run(() => this.router.navigate(['']));
      });
  }
}
