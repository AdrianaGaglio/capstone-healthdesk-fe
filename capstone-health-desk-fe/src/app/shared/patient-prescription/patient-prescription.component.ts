import {
  iDocumentation,
  iMedicalFolder,
} from './../../interfaces/imedical-folder';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { iPrescription } from '../../interfaces/imedical-folder';
import { UploadService } from '../../services/upload.service';
import { MedicalFolderService } from '../../services/medical-folder.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-prescription',
  templateUrl: './patient-prescription.component.html',
  styleUrl: './patient-prescription.component.scss',
})
export class PatientPrescriptionComponent {
  constructor(
    private uploadSvc: UploadService,
    private mfSvc: MedicalFolderService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  @Input() documentations!: iPrescription[] | iDocumentation[];
  @Input() mfID!: number;
  @Input() isDoctor: boolean = false;

  description!: string;
  showError: boolean = false;

  @Output() onUpload = new EventEmitter<iMedicalFolder>();

  @Output() onDelete = new EventEmitter<iMedicalFolder>();

  add: boolean = false;

  @Input() title!: string;

  isPatient!: boolean;

  ngOnInit() {
    this.authSvc.auth$.subscribe((auth) => {
      if (
        auth &&
        auth.role === 'PATIENT' &&
        this.title.includes('Documentazione')
      )
        this.isPatient = true;
    });

    if (this.documentations) {
      this.documentations = this.documentations.sort(
        (a, b) =>
          b.id - a.id && new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  }

  close() {
    this.add = false;
    this.files = [];
    this.description = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isDoctor']) {
      this.isDoctor =
        this.isDoctor &&
        !this.router.url.includes('paziente') &&
        !this.title.includes('Documentazione');
    }
  }

  invalid() {
    return !this.description || this.description == '';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.addFiles(input.files);
    }
  }

  files: File[] = [];
  isDragging = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files.length) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files.length) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  addFiles(files: FileList) {
    const validFiles = Array.from(files).filter(
      (file) => file.type === 'application/pdf'
    );
    if (validFiles.length === 0) {
      alert('Sono ammessi solo PDF');
      return;
    }
    this.files = [...this.files, ...validFiles];
  }

  upload() {
    if (!this.invalid()) {
      this.showError = false;
      if (this.files.length > 0) {
        this.files.forEach((file) => {
          let formData = new FormData();
          formData.append('file', file);
          this.uploadSvc.uploadPrescription(formData).subscribe((res) => {
            let request = {
              description: this.description,
              file: res,
            };
            if (this.isDoctor) {
              this.mfSvc
                .addPrescription(this.mfID, request)
                .subscribe((res) => {
                  this.onUpload.emit(res);
                  this.add = false;
                  this.files = [];
                  this.description = '';
                });
            } else {
              this.mfSvc.addCertificate(this.mfID, request).subscribe((res) => {
                this.onUpload.emit(res);
                this.add = false;
                this.files = [];
                this.description = '';
              });
            }
          });
        });
      }
    } else {
      this.showError = true;
    }
  }

  updateList(mf: iMedicalFolder) {
    this.onDelete.emit(mf);
  }
}
