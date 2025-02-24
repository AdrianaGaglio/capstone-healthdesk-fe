import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { iMedicalFolder } from '../../../interfaces/imedicalfolder';
import { MedicalFolderService } from '../../../services/medical-folder.service';
import { UploadService } from '../../../services/upload.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.scss',
})
export class AddDocumentComponent {
  constructor(
    private uploadSvc: UploadService,
    private mfSvc: MedicalFolderService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  private activeModal = inject(NgbActiveModal);

  @Input() mf!: iMedicalFolder;

  ngOnInit() {
    this.authSvc.auth$.subscribe((auth) => {
      if (auth && auth.role === 'DOCTOR') {
        this.isDoctor = true;
      } else {
        this.isDoctor = false;
      }
    });
  }

  isDoctor: boolean = false;

  description!: string;
  showError: boolean = false;

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

  invalid() {
    return !this.description || this.description == '';
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
                .addPrescription(this.mf.id, request)
                .subscribe((res) => {
                  this.activeModal.close(res);
                  this.files = [];
                  this.description = '';
                });
            } else {
              this.mfSvc
                .addCertificate(this.mf.id, request)
                .subscribe((res) => {
                  this.activeModal.close(res);

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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.addFiles(input.files);
    }
  }
}
