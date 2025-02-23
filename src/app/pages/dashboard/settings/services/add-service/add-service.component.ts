import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iDoctor } from '../../../../../interfaces/idoctor';
import { DoctorService } from '../../../../../services/doctor.service';
import { iDoctorUpdateAddInfo } from '../../../../../interfaces/idoctorupdateaddinfo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss',
})
export class AddServiceComponent {
  constructor(private doctorSvc: DoctorService, private fb: FormBuilder) {}

  @Input() doctor!: iDoctor;
  @Output() onUpdatedDoctor = new EventEmitter<iDoctor>();

  private activeModal = inject(NgbActiveModal);

  newService!: FormGroup;

  ngOnInit() {
    this.newService = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null),
      price: this.fb.control(null, [Validators.required]),
      online: this.fb.control(false),
    });
  }

  isTouchedInvalid(field: string) {
    return (
      this.newService.get(field)?.invalid && this.newService.get(field)?.touched
    );
  }

  createService() {
    let request: Partial<iDoctorUpdateAddInfo> = {
      id: this.doctor.id,
      services: [],
    };
    request.services?.push(this.newService.value);
    this.doctorSvc
      .updateDoctorInfo(this.doctor.id, request)
      .subscribe((res) => {
        this.onUpdatedDoctor.emit(res);
        this.activeModal.close(res);
      });
  }

  close(event: null) {
    this.activeModal.close(event);
  }
}
