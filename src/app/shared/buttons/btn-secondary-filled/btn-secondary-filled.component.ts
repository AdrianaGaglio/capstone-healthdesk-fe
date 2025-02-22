import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-secondary-filled',
  templateUrl: './btn-secondary-filled.component.html',
  styleUrl: './btn-secondary-filled.component.scss',
})
export class BtnSecondaryFilledComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() color: string = '';
  @Input() title: string = '';
  @Input() extraClass: string = '';
  @Output() onClick = new EventEmitter<Event>();
}
