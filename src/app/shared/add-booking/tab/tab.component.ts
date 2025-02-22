import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class TabComponent implements OnInit {
  @Input() hasOnline!: boolean;

  @Output() onTabChanged = new EventEmitter<boolean>();

  protected active = 1;

  ngOnInit() {
    this.emitOnline(false);
  }

  emitOnline(online: boolean) {
    this.onTabChanged.emit(online);
  }
}
