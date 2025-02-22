import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-danger-filled',
  templateUrl: './btn-danger-filled.component.html',
  styleUrl: './btn-danger-filled.component.scss',
})
export class BtnDangerFilledComponent {
  @Input() text: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() title: string = '';

  @Output() onClick = new EventEmitter();
}
