import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {
  currentUrl: string = '';
  next: string | null = null;
  previous: string | null = null;
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
}
