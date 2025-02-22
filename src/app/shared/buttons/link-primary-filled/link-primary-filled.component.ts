import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-link-primary-filled',
  templateUrl: './link-primary-filled.component.html',
  styleUrl: './link-primary-filled.component.scss',
})
export class LinkPrimaryFilledComponent {
  @Input() text: string = '';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() title: string = '';
  @Input() url = '';

  @Output() onClick = new EventEmitter();
}
