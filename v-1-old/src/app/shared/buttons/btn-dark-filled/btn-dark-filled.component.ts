import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-dark-filled',
  templateUrl: './btn-dark-filled.component.html',
  styleUrl: './btn-dark-filled.component.scss',
})
export class BtnDarkFilledComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() color: string = '';
  @Input() title: string = '';
  @Input() extraClass: string = '';
  @Output() onClick = new EventEmitter<Event>();
}
