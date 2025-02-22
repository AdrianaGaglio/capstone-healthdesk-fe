import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookiePolicyRoutingModule } from './cookie-policy-routing.module';
import { CookiePolicyComponent } from './cookie-policy.component';

@NgModule({
  declarations: [CookiePolicyComponent],
  imports: [CommonModule, CookiePolicyRoutingModule],
})
export class CookiePolicyModule {}
