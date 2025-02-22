import { Component, inject } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { iPatient } from '../../../interfaces/ipatientresponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAppointmentComponent } from '../../../shared/create-appointment/create-appointment.component';
import { MedicalFolderComponent } from '../../patient/medical-folder/medical-folder.component';
import { LayoutService } from '../../../services/layout.service';
import { ModalFeedbackComponent } from '../../../shared/modal-feedback/modal-feedback.component';
import { CalendarService } from '../../../services/calendar.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
})
export class PatientsComponent {
  constructor(
    private patientSvc: PatientService,
    private layoutSvc: LayoutService,
    private calendarSvc: CalendarService
  ) {}
  private modalService = inject(NgbModal);

  patients!: iPatient[];
  pages: number[] = [];
  currentPage: number = 0;
  size: number = 10;
  totalElements!: number;

  search: string = '';
  isSearching: boolean = false;

  isMobile: boolean = false;

  orderAsc: boolean = false;

  ngOnInit() {
    this.getAllPatients();

    this.layoutSvc.getLayoutMax768().subscribe((res) => {
      this.isMobile = res;
    });
  }

  getAllPatients() {
    this.patientSvc
      .getAllPaged(this.currentPage, this.size)
      .subscribe((res) => {
        this.patients = res.content;
        this.totalElements = res.totalElements;
        this.pages = this.getPages(res.totalPages);
        this.currentPage = this.pages[0];
      });
  }

  changePageAndSize(sort: string[] = []) {
    this.orderAsc = !this.orderAsc;
    sort[0] = !sort[0] ? 'name' : sort[0];
    sort[0] = sort[0] + (this.orderAsc ? ',asc' : ',desc');
    if (!this.isSearching) {
      this.patientSvc
        .getAllPaged(this.currentPage, this.size, sort)
        .subscribe((res) => {
          this.pages = this.getPages(res.totalPages);
          this.patients = res.content;
        });
    } else {
      this.searchPatients();
    }
  }

  getPages(totalPages: number) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  addAppointment(patient: iPatient) {
    const modalRef = this.modalService.open(CreateAppointmentComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
    modalRef.componentInstance.patient = patient;

    modalRef.result.then((result) => {
      this.calendarSvc.restoreCalendar();
    });
  }

  openPatientFolder(patientId: number, isDoctor: boolean) {
    const modalRef = this.modalService.open(MedicalFolderComponent, {
      size: 'xl',
      centered: true,
      scrollable: true,
      windowClass: 'custom-modal-xl',
    });

    modalRef.componentInstance.isDoctor = isDoctor;
    modalRef.componentInstance.patientId = patientId;
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchPatients();
    }
  }

  onInputChange(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    if (!input.trim()) {
      this.getAllPatients();
    }
  }

  searchPatients() {
    this.patientSvc
      .search(this.search, this.currentPage, this.size)
      .subscribe((res) => {
        this.patients = res.content;
        console.log(res);

        this.totalElements = res.totalElements;
        this.pages = this.getPages(res.totalPages);
        this.currentPage = this.pages[0];
        this.isSearching = true;
      });
  }
}
