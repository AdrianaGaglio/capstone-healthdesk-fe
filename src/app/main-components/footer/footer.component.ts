import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private router: Router) {}

  isDashboard: boolean = false;

  ngOnInit() {
    this.router.events.subscribe((events) => {
      let currentRoute = this.router.url;
      if (
        currentRoute.includes('dashboard') ||
        currentRoute.includes('paziente') ||
        currentRoute.includes('auth')
      ) {
        this.isDashboard = true;
      } else {
        this.isDashboard = false;
      }
    });
  }
}
