import { Component, NgZone } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokeApi';
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private zone: NgZone
  ) {}
  ngOnInit(): void {
    this.zone.run(() => this.router.navigate(['loading']));
    this.pokemonService.getPokemons().subscribe(() => {
      this.zone.run(() => this.router.navigate(['']));
    });
  }
}
