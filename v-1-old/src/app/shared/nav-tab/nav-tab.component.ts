import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iAddressForDoctor } from '../../interfaces/iaddressresponsefordoctor';

@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrl: './nav-tab.component.scss',
})
export class NavTabComponent {
  active = 1;

  @Input() hasOnline!: boolean;

  @Output() setOnline = new EventEmitter<boolean>();

  ngOnInit() {
    this.setOnline.emit(false);
  }

  emitOnline(online: boolean) {
    this.setOnline.emit(online);
  }
}
