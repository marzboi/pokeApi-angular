import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { SearchComponent } from './search/search.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    FilterComponent,
    ButtonsComponent,
    SearchComponent,
    DropdownMenuComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
