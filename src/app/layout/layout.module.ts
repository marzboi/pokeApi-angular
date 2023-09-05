import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { ButtonsComponent } from './buttons/buttons.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    MenuComponent,
    FilterComponent,
    ButtonsComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
