import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { SearchComponent } from './search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JumpToComponent } from './jump-to/jump-to.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    FilterComponent,
    SearchComponent,
    JumpToComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
