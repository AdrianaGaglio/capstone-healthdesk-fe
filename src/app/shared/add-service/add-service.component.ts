import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { iDoctor } from '../../interfaces/idoctorresponse';
import { DoctorServicesService } from '../../services/doctor-services.service';
import { iService } from '../../interfaces/iservice';
import { DoctorService } from '../../services/doctor.service';
import { iDoctorUpdateAddInfo } from '../../interfaces/idoctorupdateaddinfo';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss',
})
export class AddServiceComponent {
  constructor(private doctorSvc: DoctorService, private fb: FormBuilder) {}

  @Input() doctor!: iDoctor;
  @Output() updatedDoctor = new EventEmitter<iDoctor>();

  addService: boolean = false;

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
        this.updatedDoctor.emit(res);
        this.newService.reset();
        this.addService = false;
      });
  }
}
