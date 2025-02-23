import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-secondary-filled',
  templateUrl: './btn-secondary-filled.component.html',
  styleUrl: './btn-secondary-filled.component.scss',
})
export class BtnSecondaryFilledComponent {
  @Input() text: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() title: string = '';

  @Output() onClick = new EventEmitter();
}
