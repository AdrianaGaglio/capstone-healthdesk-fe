import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-link',
  templateUrl: './btn-link.component.html',
  styleUrl: './btn-link.component.scss',
})
export class BtnLinkComponent {
  @Input() color: string = '';
  @Input() url: string = '';
  @Input() href: string = '';
  @Input() title: string = '';
  @Input() active: string = '';
  @Input() exact: boolean = true;
  @Input() extraClass: string = '';
}
