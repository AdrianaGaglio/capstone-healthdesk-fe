import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-dark',
  templateUrl: './btn-dark.component.html',
  styleUrl: './btn-dark.component.scss',
})
export class BtnDarkComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() color: string = '';
  @Input() title: string = '';
  @Input() extraClass: string = '';
  @Output() onClick = new EventEmitter<Event>();
}
