import { Directive, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appBackground]',
})
export class BackgroundDirective {
  constructor(private ref: ElementRef, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (this.router.url.includes('auth')) {
        this.ref.nativeElement.classList.add('bg-secondary');
      } else {
        this.ref.nativeElement.classList.remove('bg-secondary');
      }
    });
  }
}
