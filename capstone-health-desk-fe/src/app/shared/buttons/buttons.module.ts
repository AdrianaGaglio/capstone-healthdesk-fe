import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from './btn/btn.component';
import { BtnLinkComponent } from './btn-link/btn-link.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { BtnPrimaryComponent } from './btn-primary/btn-primary.component';
import { BtnPrimaryFilledComponent } from './btn-primary-filled/btn-primary-filled.component';
import { BtnSecondaryFilledComponent } from './btn-secondary-filled/btn-secondary-filled.component';
import { BtnDarkFilledComponent } from './btn-dark-filled/btn-dark-filled.component';
import { BtnDarkComponent } from './btn-dark/btn-dark.component';
import { LinkPrimaryFilledComponent } from './link-primary-filled/link-primary-filled.component';
import { BtnDangerFilledComponent } from './btn-danger-filled/btn-danger-filled.component';
import { LinkSecondaryFilledComponent } from './link-secondary-filled/link-secondary-filled.component';

@NgModule({
  declarations: [
    BtnComponent,
    BtnLinkComponent,
    BtnPrimaryComponent,
    BtnPrimaryFilledComponent,
    BtnSecondaryFilledComponent,
    BtnDarkFilledComponent,
    BtnDarkComponent,
    LinkPrimaryFilledComponent,
    LinkSecondaryFilledComponent,
    BtnDangerFilledComponent,
  ],
  imports: [CommonModule, RouterLink, RouterLinkActive, NgIconsModule],
  exports: [
    BtnComponent,
    BtnLinkComponent,
    BtnPrimaryComponent,
    BtnPrimaryFilledComponent,
    BtnSecondaryFilledComponent,
    BtnDarkComponent,
    BtnDarkFilledComponent,
    LinkPrimaryFilledComponent,
    LinkSecondaryFilledComponent,
    BtnDangerFilledComponent,
  ],
})
export class ButtonsModule {}
