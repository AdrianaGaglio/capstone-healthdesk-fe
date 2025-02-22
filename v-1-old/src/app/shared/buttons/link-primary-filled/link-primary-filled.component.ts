import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link-primary-filled',
  templateUrl: './link-primary-filled.component.html',
  styleUrl: './link-primary-filled.component.scss',
})
export class LinkPrimaryFilledComponent {
  @Input() color: string = '';
  @Input() url: string = '';
  @Input() title: string = '';
  @Input() active: string = '';
  @Input() exact: boolean = true;
  @Input() extraClass: string = '';
  @Input() href: string = '';
}
