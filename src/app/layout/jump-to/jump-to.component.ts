import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jump-to',
  templateUrl: './jump-to.component.html',
  styleUrls: ['./jump-to.component.scss'],
})
export class JumpToComponent {
  jumpToId: number | null = null;
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private zone: NgZone
  ) {}
  jumpToPokemon() {
    if (this.jumpToId !== null) {
      this.zone.run(() => this.router.navigate([`loading`]));
      this.jumpToId < 1
        ? (this.jumpToId = 1)
        : this.jumpToId > 1010
        ? (this.jumpToId = 1010)
        : this.jumpToId;

      this.pokemonService.jumpToPokemon(this.jumpToId).subscribe(
        () => {
          this.zone.run(() => this.router.navigate([``]));
        },
        (error) => {
          console.error('Error fetching Pokémon:', error);
          this.zone.run(() => this.router.navigate([``]));
        }
      );
    } else {
      Swal.fire({
        title: 'Ummm',
        text: 'Enter a number between 1 and 1010',
        icon: 'warning',
        confirmButtonText: 'Oki',
        toast: true,
        confirmButtonColor: '#fff01f',
        iconColor: '#fff01f',
      });
    }
  }
}
