import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'au-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
  private _active: boolean = false;
  @Input() label!: string;
  @Output() active = new EventEmitter();
  constructor() {}

  setActive(active: boolean) {
    this._active = active;
    if (active) {
      this.active.next(void 0);
    }
  }

  get isActive() {
    return this._active;
  }
}
