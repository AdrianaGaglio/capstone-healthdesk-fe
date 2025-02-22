import { Component, Input, OnInit } from '@angular/core';
import { iDoctor } from '../../../interfaces/idoctor';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrl: './doctor-info.component.scss',
})
export class DoctorInfoComponent implements OnInit {
  constructor(private utilities: UtilitiesService) {}

  @Input() doctor!: iDoctor;
  avatar!: string;

  ngOnInit() {
    if (this.doctor) {
      this.avatar = this.utilities.getAvatar(this.doctor);
    }
  }
}
