import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundDirective } from './background.directive';
import { ToggleSidenavDirective } from './toggle-sidenav.directive';

@NgModule({
  declarations: [BackgroundDirective, ToggleSidenavDirective],
  imports: [CommonModule],
  exports: [BackgroundDirective, ToggleSidenavDirective],
})
export class DirectivesModule {}
