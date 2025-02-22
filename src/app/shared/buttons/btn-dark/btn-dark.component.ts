import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-dark',
  templateUrl: './btn-dark.component.html',
  styleUrl: './btn-dark.component.scss',
})
export class BtnDarkComponent {
  @Input() text: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() title: string = '';

  @Output() onClick = new EventEmitter();
}
