import { Component, inject } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { iPatient } from '../../../interfaces/ipatient';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBookingComponent } from '../../../shared/add-booking/add-booking.component';
import { CreateBookingComponent } from '../../../shared/create-booking/create-booking.component';
import { CalendarService } from '../../../services/calendar.service';
import { ModalFeedbackComponent } from '../../../shared/modalfeedback/modalfeedback.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
})
export class PatientsComponent {
  private modalService = inject(NgbModal);

  constructor(
    private patientSvc: PatientService,
    private calendarSvc: CalendarService
  ) {}

  patients!: iPatient[];

  pages: number[] = [];
  currentPage: number = 0;
  size: number = 10;
  totalElements!: number;

  search: string = '';
  isSearching: boolean = false;

  sort: string[] = ['name'];

  orderAsc: boolean = false;

  ngOnInit() {
    this.getAllPatients();
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

  changePageAndSize(page: number = this.currentPage, sort: string[] = []) {
    this.sort = sort[0] ? sort : this.sort;
    if (!this.isSearching) {
      this.patientSvc
        .getAllPaged(page, this.size, this.sort)
        .subscribe((res) => {
          this.pages = this.getPages(res.totalPages);
          this.patients = res.content;
          this.currentPage = res.pageable.pageNumber;
        });
    } else {
      this.searchPatients();
    }
  }

  order(page: number = this.currentPage, sort: string[] = []) {
    this.sort = sort[0] ? sort : this.sort;
    this.orderAsc = !this.orderAsc;
    this.sort = [this.sort[0] + (this.orderAsc ? ',asc' : ',desc')];
    this.changePageAndSize(this.currentPage, this.sort);
  }

  getPages(totalPages: number) {
    return Array.from({ length: totalPages }, (_, i) => i);
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

  book(patient: iPatient) {
    this.openModal(patient)
      .result.then((result) => {
        this.calendarSvc.restoreCalendar();
        if (result) {
          this.feedback('Prenotazione inserita correttamente');
        }
      })
      .catch((error) => {
        this.modalService.dismissAll(error);
      });
  }

  openModal(patient: iPatient) {
    const modalRef = this.modalService.open(CreateBookingComponent, {
      size: 'xl',
      centered: true,
      scrollable: true,
    });

    modalRef.componentInstance.patient = patient;

    return modalRef;
  }

  feedback(message: string) {
    const modalRef = this.modalService.open(ModalFeedbackComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isError = false;

    setTimeout(() => {
      this.modalService.dismissAll();
    }, 1000);
  }
}
