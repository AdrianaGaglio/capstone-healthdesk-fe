import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link-secondary-filled',
  templateUrl: './link-secondary-filled.component.html',
  styleUrl: './link-secondary-filled.component.scss',
})
export class LinkSecondaryFilledComponent {
  @Input() color: string = '';
  @Input() url: string = '';
  @Input() title: string = '';
  @Input() active: string = '';
  @Input() exact: boolean = true;
  @Input() extraClass: string = '';
  @Input() href: string = '';
}
