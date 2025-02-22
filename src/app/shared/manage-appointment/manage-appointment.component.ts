import { Component, Input } from '@angular/core';
import { iAppointment } from '../../interfaces/iappointment';
import { iPatient } from '../../interfaces/ipatient';

@Component({
  selector: 'app-manage-appointment',
  templateUrl: './manage-appointment.component.html',
  styleUrl: './manage-appointment.component.scss',
})
export class ManageAppointmentComponent {
  constructor() {}

  @Input() appointment!: iAppointment;

  patient!: iPatient;

  // valori per generare inizio e fine appuntamento
  date: string = '';
  time: string = '';

  today: string = '';

  // controlla se è abilitata la modifica
  edit: boolean = false;

  isPassed: boolean = false;

  // array fasce orarie
  timeRanges: string[] = [];

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];

    if (new Date(this.appointment.startDate) < new Date()) {
      this.isPassed = true;
    }

    if (this.appointment) {
      this.patient = this.appointment.patient;
    }

    // genero i possibili orari
    this.timeRanges = Array.from({ length: 25 }, (_, i) => {
      // a partire dalle 8
      const startHour = 8 + Math.floor(i / 2);
      const startMin = (i % 2) * 30;

      // formatto gli orari generati a 2 cifre
      const format = (num: number) => num.toString().padStart(2, '0');
      // genero ora di inizio
      const startTime = `${format(startHour)}:${format(startMin)}`;

      return `${startTime}`;
    });
  }

  formattedDate() {
    let date = new Date(this.appointment.startDate);
    let days = [
      'Domenica',
      'Lunedì',
      'Martedi',
      'Mercoledi',
      'Giovedi',
      'Venerdi',
      'Sabato',
    ];
    let dayString = days[date.getDay()];

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // I mesi partono da 0
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${dayString} ${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
}
