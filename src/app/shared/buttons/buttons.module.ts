import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnPrimaryFilledComponent } from './btn-primary-filled/btn-primary-filled.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LinkPrimaryFilledComponent } from './link-primary-filled/link-primary-filled.component';
import { BtnPrimaryComponent } from './btn-primary/btn-primary.component';
import { BtnDarkComponent } from './btn-dark/btn-dark.component';
import { BtnDarkFilledComponent } from './btn-dark-filled/btn-dark-filled.component';
import { LinkDarkFilledComponent } from './link-dark-filled/link-dark-filled.component';

@NgModule({
  declarations: [
    BtnPrimaryFilledComponent,
    LinkPrimaryFilledComponent,
    BtnPrimaryComponent,
    BtnDarkComponent,
    BtnDarkFilledComponent,
    LinkDarkFilledComponent,
  ],
  imports: [CommonModule, RouterLink, RouterLinkActive],
  exports: [
    BtnPrimaryFilledComponent,
    LinkPrimaryFilledComponent,
    BtnPrimaryComponent,
    BtnDarkComponent,
    BtnDarkFilledComponent,
    LinkDarkFilledComponent,
  ],
})
export class ButtonsModule {}
