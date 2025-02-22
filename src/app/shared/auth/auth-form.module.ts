import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '../buttons/buttons.module';
import { NgIconsModule } from '@ng-icons/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AuthFormComponent, LoginFormComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonsModule,
    ReactiveFormsModule,
    NgIconsModule,
  ],
  exports: [AuthFormComponent, LoginFormComponent, RegisterFormComponent],
  providers: [NgbActiveModal],
})
export class AuthFormModule {}
