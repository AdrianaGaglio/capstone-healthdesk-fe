import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { ButtonsModule } from '../buttons/buttons.module';
import { SubMenuComponent } from './sub-menu/sub-menu.component';

@NgModule({
  declarations: [DropdownComponent, SubMenuComponent],
  imports: [CommonModule, NgbDropdownModule, RouterLink, ButtonsModule],
  exports: [DropdownComponent, SubMenuComponent],
})
export class DropdownModule {}
