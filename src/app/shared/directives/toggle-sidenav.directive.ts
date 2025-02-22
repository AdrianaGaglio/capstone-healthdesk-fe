import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleSidenav]',
})
export class ToggleSidenavDirective {
  constructor(private ref: ElementRef) {}

  sidenav!: HTMLElement;

  ngOnInit() {
    this.sidenav = document.querySelector('#sidenav') as HTMLElement;
  }

  @HostListener('click') onClick() {
    this.sidenav.classList.toggle('show');
  }
}
