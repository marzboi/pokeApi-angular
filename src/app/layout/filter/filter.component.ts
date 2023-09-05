import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  type: number = 0;
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private zone: NgZone
  ) {}
  handlePokemonByType() {
    this.zone.run(() => this.router.navigate(['loading']));
    this.pokemonService.getPokemonByType(this.type).subscribe(() => {
      this.zone.run(() => this.router.navigate(['']));
    });
  }
}
