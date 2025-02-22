import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-danger-filled',
  templateUrl: './btn-danger-filled.component.html',
  styleUrl: './btn-danger-filled.component.scss',
})
export class BtnDangerFilledComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() color: string = '';
  @Input() title: string = '';
  @Input() extraClass: string = '';
  @Output() onClick = new EventEmitter<Event>();
}
