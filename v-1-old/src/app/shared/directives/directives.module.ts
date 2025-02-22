import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomBgDirective } from './custom-bg.directive';
import { ToggleSidenavDirective } from './toggle-sidenav.directive';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [CustomBgDirective, ToggleSidenavDirective, TruncatePipe],
  imports: [CommonModule],
  exports: [CustomBgDirective, ToggleSidenavDirective, TruncatePipe],
})
export class DirectivesModule {}
