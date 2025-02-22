import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-primary',
  templateUrl: './btn-primary.component.html',
  styleUrl: './btn-primary.component.scss',
})
export class BtnPrimaryComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() color: string = '';
  @Input() title: string = '';
  @Input() extraClass: string = '';
  @Output() onClick = new EventEmitter<Event>();
}
