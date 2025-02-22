import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-primary-filled',
  templateUrl: './btn-primary-filled.component.html',
  styleUrl: './btn-primary-filled.component.scss',
})
export class BtnPrimaryFilledComponent {
  @Input() text: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() title: string = '';

  @Output() onClick = new EventEmitter();
}
