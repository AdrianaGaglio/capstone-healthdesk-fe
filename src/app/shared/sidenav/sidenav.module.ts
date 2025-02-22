import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { NgIconsModule } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    NgIconsModule,
    RouterLink,
    RouterLinkActive,
    DirectivesModule,
  ],
  exports: [SidenavComponent],
})
export class SidenavModule {}
