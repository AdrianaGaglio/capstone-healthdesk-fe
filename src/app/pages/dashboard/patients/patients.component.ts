import { Component } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { iPatient } from '../../../interfaces/ipatient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
})
export class PatientsComponent {
  constructor(private patientSvc: PatientService) {}

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
}
