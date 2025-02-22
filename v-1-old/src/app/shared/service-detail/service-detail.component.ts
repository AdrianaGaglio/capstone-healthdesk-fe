import { Component, inject, Input } from '@angular/core';
import { iService } from '../../interfaces/iservice';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss',
})
export class ServiceDetailComponent {
  private activeModal = inject(NgbActiveModal);

  @Input() service!: iService;
}
