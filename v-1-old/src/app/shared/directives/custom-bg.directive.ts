import { Directive, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appCustomBg]',
})
export class CustomBgDirective {
  constructor(private ref: ElementRef, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      if (currentRoute.includes('/auth')) {
        this.ref.nativeElement.classList.add('custom-bg');
      } else {
        this.ref.nativeElement.classList.remove('custom-bg');
        this.ref.nativeElement.classList.add('default-bg');
      }
    });
  }
}
