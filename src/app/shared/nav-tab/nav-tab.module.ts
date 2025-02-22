import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabComponent } from './nav-tab.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [NavTabComponent],
  imports: [CommonModule, NgbNavModule, FormsModule, NgIconsModule],
  exports: [NavTabComponent],
})
export class NavTabModule {}
