import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  constructor(private router: Router) {}

  show: boolean = false;

  isDoctor: boolean = true;

  ngOnInit() {
    if (this.router.url.includes('paziente')) {
      this.isDoctor = false;
    } else {
      this.isDoctor = true;
    }
  }
}
