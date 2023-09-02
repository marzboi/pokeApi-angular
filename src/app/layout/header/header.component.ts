import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private zone: NgZone, private router: Router) {}

  handleNavigateHome() {
    this.zone.run(() => this.router.navigate(['']));
  }
}
