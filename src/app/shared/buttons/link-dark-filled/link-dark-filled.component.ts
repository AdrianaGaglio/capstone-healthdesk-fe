import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-link-dark-filled',
  templateUrl: './link-dark-filled.component.html',
  styleUrl: './link-dark-filled.component.scss',
})
export class LinkDarkFilledComponent {
  @Input() text: string = '';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() title: string = '';
  @Input() url = '';

  @Output() onClick = new EventEmitter();
}
