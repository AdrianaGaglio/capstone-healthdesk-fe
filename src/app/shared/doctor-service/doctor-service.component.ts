import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { iDoctor } from '../../interfaces/idoctorresponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iService } from '../../interfaces/iservice';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';

@Component({
  selector: 'app-doctor-service',
  templateUrl: './doctor-service.component.html',
  styleUrl: './doctor-service.component.scss',
})
export class DoctorServiceComponent {
  modalService = inject(NgbModal);

  @Input() doctor!: iDoctor;
  @Output() onClick = new EventEmitter<iService>();

  serviceDetails(service: iService) {
    const modalRef = this.modalService.open(ServiceDetailComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
    modalRef.componentInstance.service = service;
  }

  emitService(service: iService) {
    this.onClick.emit(service);
  }
}
