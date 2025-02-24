import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundDirective } from './background.directive';
import { ToggleSidenavDirective } from './toggle-sidenav.directive';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [BackgroundDirective, ToggleSidenavDirective, TruncatePipe],
  imports: [CommonModule],
  exports: [BackgroundDirective, ToggleSidenavDirective, TruncatePipe],
})
export class DirectivesModule {}
