import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { PatientService } from '../../../services/patient.service';
import { iPatient } from '../../../interfaces/ipatientresponse';
import { CookieService } from 'ngx-cookie-service';
import { iDoctor } from '../../../interfaces/idoctorresponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private patientSvc: PatientService,
    private doctorSvc: DoctorService,
    private cookie: CookieService
  ) {}

  loginRequest!: FormGroup;
  showPassword: boolean = false;

  isAuthPage: boolean = false;

  @Output() onLogin = new EventEmitter<iPatient>();

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isAuthPage = currentRoute.includes('auth');
    });

    this.loginRequest = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      remember: this.fb.control(
        this.cookie.get('remember') === 'true' ? true : false
      ),
    });
  }

  // funzione di login
  login() {
    if (this.loginRequest.valid) {
      this.authSvc
        .login(
          this.loginRequest.value,
          this.loginRequest.get('remember')?.value
        )
        .pipe(
          tap((auth) => {
            if (auth.role === 'DOCTOR') {
              const previousPage = localStorage.getItem('details');

              if (previousPage) {
                window.history.back();
                localStorage.removeItem('details');
              } else {
                // altrimenti rendirizzo alla dashboard
                this.router.navigate(['/dashboard']);
              }
            } else if (auth.role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else {
              if (this.isAuthPage) {
                this.authSvc.user$.subscribe((res) => {
                  res = res as iPatient;

                  if (!res.taxId) {
                    this.router.navigate(['/paziente/profilo']);
                  } else if (localStorage.getItem('details')) {
                    window.history.back();
                    localStorage.removeItem('details');
                  } else {
                    this.router.navigate(['/paziente']);
                  }
                });
              }
            }
          }),
          tap((auth) => {
            if (auth.role === 'DOCTOR') {
              this.doctorSvc
                .getDoctor()
                .pipe(tap((doctor) => this.authSvc.user$.next(doctor)))
                .subscribe();
            } else if (
              auth.role === 'ADMIN' &&
              !localStorage.getItem('configured')
            ) {
              this.doctorSvc.getDoctor().subscribe();
            } else if (
              // se l'utente è un paziente recupero i dati del paziente
              auth.role === 'PATIENT'
            ) {
              this.patientSvc.getPatient().subscribe();
            }
          })
        )
        .subscribe((res) => {
          if (!this.isAuthPage) {
            this.patientSvc.getPatient().subscribe((p) => this.onLogin.emit(p));
          }
        });
    }
  }

  // controlla se il campo è invalido
  isTouchedInvalid(field: string) {
    return (
      this.loginRequest.get(field)?.touched &&
      this.loginRequest.get(field)?.invalid
    );
  }

  // ritorna l'errore di validazione del campo
  message(field: string) {
    if (this.loginRequest.get(field)?.hasError('email')) {
      return 'Email non valida';
    } else {
      return 'Campo obbligatorio';
    }
  }
}
