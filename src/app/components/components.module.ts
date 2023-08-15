import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, RouterModule],
})
export class ComponentsModule {}
