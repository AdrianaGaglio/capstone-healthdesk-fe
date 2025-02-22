import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthUserComponent } from './auth-user.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { NgIconsModule } from '@ng-icons/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [AuthUserComponent, LoginFormComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    ButtonsModule,
    NgIconsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  exports: [AuthUserComponent, LoginFormComponent, RegisterFormComponent],
})
export class AuthUserModule {}
