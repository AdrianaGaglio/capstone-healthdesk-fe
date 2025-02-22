import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-dark-filled',
  templateUrl: './btn-dark-filled.component.html',
  styleUrl: './btn-dark-filled.component.scss',
})
export class BtnDarkFilledComponent {
  @Input() text: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() title: string = '';

  @Output() onClick = new EventEmitter();
}
