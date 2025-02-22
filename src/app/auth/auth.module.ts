import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '../shared/buttons/buttons.module';
import { NgIconsModule } from '@ng-icons/core';
import { AuthUserModule } from '../shared/auth-user/auth-user.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetRequestComponent } from './reset-request/reset-request.component';

@NgModule({
  declarations: [AuthComponent, RegisterComponent, ResetPasswordComponent, ResetRequestComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ButtonsModule,
    NgIconsModule,
    AuthUserModule,
  ],
})
export class AuthModule {}
